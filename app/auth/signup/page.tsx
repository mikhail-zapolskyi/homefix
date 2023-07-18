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
import { GoogleSigninButton, FacebookSigninButton } from "../../../components";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import axios from "axios";

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const { data: session, status } = useSession();

    if (session && status === "authenticated") {
        redirect("/");
    }
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
        const confirmPassword = data.get("confirmPassword");

        if (!email || !password || !confirmPassword) {
            console.log("Please fill all fields");
        }

        if (password !== confirmPassword) {
            console.log("password doesn't match");
        }

        axios
            .post("/api/users", { email, password })
            .then((res) => {
                if (res.status === 201) {
                    redirect("/");
                }
            })
            .catch((error) => console.error(error));
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
                    Sign up / Create Your Account
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
                                label="Email (Required)"
                                autoFocus
                            />
                        </Grid>
                        <Grid item mobile={12}>
                            <FormControl
                                variant="outlined"
                                sx={{ width: "100%" }}
                            >
                                <InputLabel htmlFor="password">
                                    Password (Required)
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
                        <Grid item mobile={12}>
                            <FormControl
                                variant="outlined"
                                sx={{ width: "100%" }}
                            >
                                <InputLabel htmlFor="confirmPassword">
                                    Confirm Password (Required)
                                </InputLabel>
                                <OutlinedInput
                                    id="confirmPassword"
                                    name="confirmPassword"
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
                        <Grid item mobile={12}>
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
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="signin" variant="body2">
                                Already have an account? Sign in
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
}
