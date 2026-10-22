import { Route, Routes } from "react-router";
import Home from "../pages/Home/Home";
import Path from "./routes";
import { AuthGuard } from "./AuthGuard";
import Login from "../pages/Login";

export default function Router() {
	return (
		<Routes>
			<Route path={Path.Home} element={<AuthGuard />}>
				<Route index element={<Home />} />
			</Route>

			<Route path={Path.Login} element={<Login />} />

			{/* <Route path={Path.Login} element={<About />} />

			<Route element={<AuthLayout />}>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Route> */}
		</Routes>
	);
}
