import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import Providers from "./core/Providers.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Providers />
	</StrictMode>,
);
