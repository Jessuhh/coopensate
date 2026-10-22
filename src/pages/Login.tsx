import { Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { Navigate } from "react-router";
import routes from "../core/routes";
import { supabase } from "../core/supabase";
import { useUser } from "../hooks/useUser";

export default function Login() {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const { user } = useUser();

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		setMessage("");

		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: window.location.origin,
			},
		});

		setLoading(false);

		if (error) {
			setMessage(error.message);
			return;
		}

		setMessage("Controleer je e-mail voor de inloglink.");
	}

	if (user) {
		return <Navigate to={routes.Home} replace />;
	}

	return (
		<form onSubmit={handleLogin}>
			<TextInput
				label="Email"
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>

			<Button type="submit" disabled={loading}>
				{loading ? "Bezig..." : "Inloggen"}
			</Button>

			{message && <p>{message}</p>}
		</form>
	);
}
