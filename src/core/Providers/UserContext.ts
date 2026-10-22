import type { User } from "@supabase/supabase-js";
import { createContext } from "react";

export type UserContextValue = {
	user: User | null;
	loading: boolean;
};

export const UserContext = createContext<UserContextValue | undefined>(
	undefined,
);
