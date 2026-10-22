import { Navigate, Outlet } from "react-router";
import routes from "./routes";
import { useUser } from "../hooks/useUser";

export function AuthGuard() {
	const { user, loading } = useUser();

	if (loading) return <p>Laden...</p>;

	if (!user) {
		return <Navigate to={routes.Login} replace />;
	}

	return <Outlet />;
}
