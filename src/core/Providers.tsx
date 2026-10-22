import { createTheme, MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router";
import Router from "./Router";
import { UserProvider } from "./Providers/UserProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme({/** Put your mantine theme override here */});
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
