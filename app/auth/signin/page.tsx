// SIGN IN PAGE

"use client";

import { Grid, Link, Typography, Box, Divider } from "@mui/material";

import {
    GoogleSigninButton,
    FacebookSigninButton,
    CustomTextField,
    CustomButton,
    PageContainer,
} from "@/components";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const SignIn = () => {
    const { data: session, status } = useSession();

    if (session && status === "authenticated") {
        redirect("/");
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");

        if (!email || !password) {
            console.log("Please fill all fields");
        }

        signIn("credentials", { email, password });
    };

    return (
        <PageContainer maxWidth="md">
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
                    Sign in
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
                                name="email"
                                type="email"
                                placeholder="Email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                        </Grid>
                        <Grid container item xs={12} justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    href="request-password-reset"
                                    variant="body2"
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                text="Sign In"
                            />
                        </Grid>
                        <Grid container item xs={12} justifyContent="flex-end">
                            <Grid item>
                                <Link href="signin" variant="body2">
                                    Don&apos;t have an account? Sign up.
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
};

export default SignIn;
