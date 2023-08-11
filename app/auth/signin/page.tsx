// SIGN IN PAGE

"use client";

import {
    Grid,
    Button,
    Link,
    Typography,
    Container,
    Box,
    Divider,
} from "@mui/material";

import {
    GoogleSigninButton,
    FacebookSigninButton,
    CustomTextField,
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
        <Container component="main" maxWidth={"md"}>
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
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
                        <Grid item sm={12}>
                            <CustomTextField
                                name="email"
                                type="email"
                                placeholder="Email"
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <Grid item sm={12}>
                                <CustomTextField
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                />
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    href="request-password-reset"
                                    variant="body2"
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="signup" variant="body2">
                                Don&apos;t have an account? Sign up.
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
                <Divider variant="middle" sx={{ width: "100%" }}>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                    >
                        OR
                    </Typography>
                </Divider>
                <GoogleSigninButton />
                <FacebookSigninButton />
            </Box>
        </Container>
    );
};

export default SignIn;
