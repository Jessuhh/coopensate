import { Button, NumberInput, Stack, Title } from "@mantine/core";
import { createId } from "@paralleldrive/cuid2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useActivities from "../../api/useActivities";
import useProfile from "../../api/useProfile";
import { supabase } from "../../core/supabase";
import Activity from "./_activity";
import Progress from "./_progress";

const KILOMETER_TO_EMISSION_RATIO = 170;

export default function Home() {
	const { data: profile } = useProfile();
	const [kilometers, setKilometers] = useState<number>(0);
	// const { data, isPending, error } = useQuery({
	// 	queryKey: ["activity"],
	// 	queryFn: async () => {
	// 		const { data, error } = await supabase.from("activities").select("*");

	// 		if (error) throw error;
	// 		return data;
	// 	},
	// });
	const queryClient = useQueryClient();
	const { data: activities, isPending, error } = useActivities();

	const insertActivity = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("activities").insert({
				id: createId(),
				created_by: profile?.id ?? "",
				emission: kilometers * KILOMETER_TO_EMISSION_RATIO,
				type_id: "cycle",
			});

			if (error) throw error;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["activity"],
			});
		},
	});

	if (isPending) return <p>Laden...</p>;
	if (error) return <p>Er ging iets mis.</p>;

	return (
		<Stack>
			<Title>Hello {profile?.name}</Title>
			<NumberInput
				value={kilometers}
				onValueChange={(value) => setKilometers(Number(value.value))}
				rightSection={"km"}
			/>
			<Button
				onClick={() => insertActivity.mutate()}
				loading={insertActivity.isPending}
			>
				Voeg toe
			</Button>
			<Progress activities={activities} />
			<Stack>
				{activities?.map((activity) => (
					<Activity key={activity.id} activity={activity} />
				))}
			</Stack>
		</Stack>
	);
}
