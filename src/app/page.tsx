// HOME PAGE
"use client";

import { Button } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

const ButtonAuth = () => {
	const { data: session, status } = useSession();

	if (session && status === "authenticated") {
		return (
			<pre>
				{JSON.stringify(session)};
				<Button onClick={() => signOut()}>Sign Out</Button>
			</pre>
		);
	}

	return <Button onClick={() => signIn()}>Sign In</Button>;
};

export default async function Home() {
	return (
		<main>
			<ButtonAuth />
		</main>
	);
}
