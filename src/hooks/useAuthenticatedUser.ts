import type { User } from "@supabase/supabase-js";
import { useUser } from "./useUser";

export function useAuthenticatedUser(): User {
	const { user, loading } = useUser();

	if (loading) {
		throw new Error(
			"useAuthenticatedUser werd gebruikt voordat auth geladen was",
		);
	}

	if (!user) {
		throw new Error("useAuthenticatedUser vereist een ingelogde gebruiker");
	}

	return user;
}
