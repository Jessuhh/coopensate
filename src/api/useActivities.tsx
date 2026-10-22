import type { QueryData } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../core/supabase";

const query = supabase
	.from("activities")
	.select("*, activities_types(*), profiles(*)");

export type Activities = QueryData<typeof query>;
export type Activity = Activities[number];

export default function useActivities() {
	const queryResult = useQuery({
		queryKey: ["activity"],
		queryFn: async () => {
			const { data, error } = await query;

			if (error) throw error;
			return data;
		},
	});

	return queryResult;
}
