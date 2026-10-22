import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { UserContext } from "./UserContext";

export function UserProvider({ children }: React.PropsWithChildren) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let active = true;

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			if (active) {
				setUser(session?.user ?? null);
				setLoading(false);
			}
		});

		return () => {
			active = false;
			subscription.unsubscribe();
		};
	}, []);

	return (
		<UserContext.Provider value={{ user, loading }}>
			{children}
		</UserContext.Provider>
	);
}
