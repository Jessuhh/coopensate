import type { QueryData } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../core/supabase";

const query = supabase.from("activities_types").select("*");

export type ActivityType = QueryData<typeof query>;

export default function useActivityType() {
	const queryResult = useQuery({
		queryKey: ["activity_type"],
		queryFn: async () => {
			const { data, error } = await query;

			if (error) throw error;
			return data;
		},
	});

	return queryResult;
}
