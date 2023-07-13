// SIGN IN PAGE

"use client";

import React, { useState } from "react";
import {
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Button,
    TextField,
    Link,
    Typography,
    Container,
    Box,
    Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GoogleSigninButton, FacebookSigninButton } from "@/components";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const SignIn = () => {
    const { data: session, status } = useSession();

    if (session && status === "authenticated") {
        redirect("/");
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
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
        <Container component="main" maxWidth={"tablet"}>
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
                        <Grid item mobile={12}>
                            <TextField
                                autoComplete="given-name"
                                name="email"
                                fullWidth
                                id="email"
                                label="Email"
                                autoFocus
                            />
                        </Grid>
                        <Grid item mobile={12}>
                            <FormControl
                                variant="outlined"
                                sx={{ width: "100%" }}
                            >
                                <InputLabel htmlFor="password">
                                    Password
                                </InputLabel>
                                <OutlinedInput
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
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
                                Don’t have an account? Sign up.
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
