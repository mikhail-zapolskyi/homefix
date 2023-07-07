// SIGN IN PAGE

"use client";

import React, { useState } from "react";
import { GoogleSigninButton } from "@/components";
import {
	Box,
	Button,
	Container,
	CssBaseline,
	Divider,
	TextField,
	Typography,
} from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const SignIn = () => {
	const { data: session, status } = useSession();

	const [authValue, setAuthValue] = useState({
		email: "",
		password: "",
	});

	const changeAuthValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setAuthValue({ ...authValue, [e.target.name]: e.target.value });
	};

	if (session && status === "authenticated") {
		redirect("/");
	}

	return (
		<Container
			component="main"
			sx={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CssBaseline />
			<Box
				sx={{
					width: { xs: "320px", sm: "400px", md: "600px" },
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					p: 5,
					borderRadius: 1,
					boxShadow: {
						sm: "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
					},
				}}
			>
				<h2>Sign In</h2>
				<TextField
					label="Email"
					id="email"
					name="email"
					size="small"
					variant="standard"
					sx={{ width: { xs: 280, sm: 320 }, marginBottom: 2 }}
					onChange={changeAuthValue}
					value={authValue.email}
					autoFocus={true}
				/>
				<TextField
					label="Password"
					id="password"
					name="password"
					size="small"
					variant="standard"
					type="password"
					sx={{ width: { xs: 280, sm: 320 }, marginBottom: 2 }}
					value={authValue.password}
					onChange={changeAuthValue}
				/>
				<Button
					variant="contained"
					size="large"
					sx={{ width: { xs: 200, sm: 320 }, marginBottom: 2 }}
					onClick={() => signIn("credentials", authValue)}
				>
					Sign In
				</Button>
				<Divider variant="middle" sx={{ width: "100%" }}>
					<Typography
						variant="body2"
						sx={{ color: "text.secondary" }}
					>
						OR
					</Typography>
				</Divider>
				<GoogleSigninButton />
			</Box>
		</Container>
	);
};

export default SignIn;
