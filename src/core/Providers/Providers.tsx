import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import Router from "../Router";
import { UserProvider } from "./UserProvider";
import { theme } from "./theme";

const queryClient = new QueryClient();

export default function Providers() {
	return (
		<QueryClientProvider client={queryClient}>
			<UserProvider>
				<BrowserRouter>
					<MantineProvider theme={theme}>
						<Router />
					</MantineProvider>
				</BrowserRouter>
			</UserProvider>
		</QueryClientProvider>
	);
}
