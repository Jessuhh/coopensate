import { useContext } from "react";
import { UserContext, type UserContextValue } from "../core/Providers/UserProvider";


export function useUser(): UserContextValue {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser moet binnen een UserProvider gebruikt worden");
  }

  return context;
}
