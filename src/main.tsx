import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Providers from "./core/Providers/Providers.tsx";
import "./main.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Providers />
	</StrictMode>,
);
