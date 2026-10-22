import type { QueryData } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../core/supabase";
import { useAuthenticatedUser } from "../hooks/useAuthenticatedUser";

const query = (userId: string) =>
	supabase.from("profiles").select("*").eq("id", userId).single();

export type Profile = QueryData<typeof query>;

export default function useProfile() {
	const user = useAuthenticatedUser();

	const queryResult = useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const { data, error } = await query(user.id);

			if (error) throw error;
			return data;
		},
	});

	return queryResult;
}
