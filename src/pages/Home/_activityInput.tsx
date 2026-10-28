import { Button, NumberInput, Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { createId } from "@paralleldrive/cuid2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	ACTIVITY_TYPE_UNIT,
	ACTIVITY_TYPES,
	type ActivityType,
	type ActivityTypeUnit,
} from "../../api/activity_type/activityType";
import useActivityType from "../../api/activity_type/useActivityType";
import useProfile from "../../api/useProfile";
import { supabase } from "../../core/supabase";

const KILOMETER_TO_EMISSION_RATIO = 170;

type CreateActivity = {
	length: number;
	type: ActivityType;
};

export default function ActivityInput() {
	const { data: profile } = useProfile();
	const { data: activityTypes } = useActivityType();
	const queryClient = useQueryClient();

	const form = useForm<CreateActivity>({
		mode: "uncontrolled",
		initialValues: {
			length: 0,
			type: "cycle",
		},
	});

	const unit = form.useWatchValue("type");
	const selectedType = activityTypes?.find((t) => t.id === unit);
	const selectedUnit =
		ACTIVITY_TYPE_UNIT[selectedType?.unit as ActivityTypeUnit]?.trim();

	// TODO: move to hook
	// TODO: only allow positive values
	const insertActivity = useMutation({
		mutationFn: async (activity: CreateActivity) => {
			const { error } = await supabase.from("activities").insert({
				id: createId(),
				created_by: profile?.id ?? "",
				emission:
					activity.length *
					(selectedType?.emission_factor ?? KILOMETER_TO_EMISSION_RATIO),
				type_id: activity.type,
			});

			if (error) throw error;
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["activity"],
			});
		},
	});

	async function onAddActivity(values: CreateActivity) {
		insertActivity.mutate(values);
	}

	return (
		<form onSubmit={form.onSubmit(onAddActivity)}>
			<NumberInput
				label="Afstand"
				rightSection={selectedUnit}
				rightSectionWidth={60}
				min={1}
				{...form.getInputProps("length")}
			/>
			<Select
				data={Object.entries(ACTIVITY_TYPES).map(([id, name]) => ({
					value: id,
					label: name,
				}))}
				{...form.getInputProps("type")}
			/>
			<Button
				// onClick={() => insertActivity.mutate(1)}
				loading={insertActivity.isPending}
				type="submit"
			>
				Voeg toe
			</Button>
		</form>
	);
}
