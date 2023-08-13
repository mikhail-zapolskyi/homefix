"use client";

import { Grid, Link, Typography, Box, Divider } from "@mui/material";

import {
    GoogleSigninButton,
    FacebookSigninButton,
    CustomTextField,
    CustomButton,
    PageContainer,
} from "@/components";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";

export default function SignUp() {
    const router = useRouter();
    const { data: session, status } = useSession();

    if (session && status === "authenticated") {
        redirect("/");
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get("name");
        const email = data.get("email");
        const password = data.get("password");
        const confirmPassword = data.get("confirmPassword");

        if (!name || !email || !password || !confirmPassword) {
            console.log("Please fill all fields");
        }

        if (password !== confirmPassword) {
            console.log("password doesn't match");
        }

        axios
            .post("/api/users", { name, email, password })
            .then((res) => {
                console.log(res.status);
                if (res.status === 201) {
                    console.log("works");
                    router.push("/auth/signin");
                }
            })
            .catch((error) => console.error(error));
    };

    return (
        <PageContainer maxWidth={"md"}>
            <Box
                sx={{
                    height: "80%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign up / Create Your Account
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CustomTextField
                                name="name"
                                placeholder="Name (Required)"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                                name="email"
                                type="email"
                                placeholder="Email (Required)"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                                name="password"
                                type="password"
                                placeholder="Password (Required)"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password (Required)"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Your password must:</Typography>
                            <Typography component={"ul"}>
                                <Typography component={"li"}>
                                    Minimum length of 8 characters
                                </Typography>
                                <Typography component={"li"}>
                                    Must include uppercase letters
                                </Typography>
                                <Typography component={"li"}>
                                    Must include lowercase letters
                                </Typography>
                                <Typography component={"li"}>
                                    Must include numbers
                                </Typography>
                                <Typography component={"li"}>
                                    Must include special characters
                                </Typography>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                text="Sign Up"
                            />
                        </Grid>
                        <Grid container item xs={12} spacing={2}>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                container
                                justifyContent={{
                                    xs: "center",
                                    sm: "flex-start",
                                }}
                            >
                                <Link href="pro-signup" variant="body2">
                                    Pro? click here to sign up
                                </Link>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                container
                                justifyContent={{
                                    xs: "center",
                                    sm: "flex-end",
                                }}
                            >
                                <Link href="signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider variant="middle" sx={{ width: "100%" }}>
                        <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                        >
                            OR
                        </Typography>
                    </Divider>

                    <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <GoogleSigninButton />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <FacebookSigninButton />
                    </Grid>
                </Box>
            </Box>
        </PageContainer>
    );
}
