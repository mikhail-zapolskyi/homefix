"use client";

import React from "react";
import { Grid, Link, Typography, Box, Divider, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
    GoogleSigninButton,
    CustomTextField,
    CustomButton,
    AuthContainer,
} from "@/components";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ViewSignIn = () => {
    const router = useRouter();
    const theme = useTheme();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");

        try {
            if (!email || !password) {
                toast.error("Email or Password is missing");
                return;
            }

            toast.promise(
                signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                }),
                {
                    pending: "Sigining in",
                    success: {
                        render({ data }) {
                            if (data && data.error) {
                                toast.error(data.error);
                                return "Check credentials and try again";
                            }

                            router.push("/dashboard");
                            return "Sign in succesfully";
                        },
                    },
                    error: "Something went wrong",
                }
            );
        } catch (error: any) {
            throw new Error(error);
        }
    };

    return (
        <AuthContainer>
            <Typography component="h1" variant="h5" sx={{ padding: "1rem" }}>
                Sign in
            </Typography>
            <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ padding: "1rem" }}
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
                        <Grid item></Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            text="Sign In"
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} p={4}>
                    <Divider sx={{ width: "100%" }}>
                        <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                        >
                            OR
                        </Typography>
                    </Divider>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <GoogleSigninButton />
                </Grid>
            </Box>
            <Divider variant="middle" sx={{ width: "100%" }}></Divider>
            <Stack
                sx={{
                    padding: "1rem",
                    width: "100%",
                    backgroundColor: `${theme.palette.grey[200]}`,
                    borderEndStartRadius: ".8rem",
                    borderEndEndRadius: ".8rem",
                }}
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
            >
                <Link href="signup" variant="body2" color="primary.dark">
                    {`Don't have an account? Please Sign up.`}
                </Link>
                <Link
                    href="request-password-reset"
                    variant="body2"
                    color="primary.dark"
                >
                    {`Forgot password?`}
                </Link>
            </Stack>
        </AuthContainer>
    );
};

export default ViewSignIn;
