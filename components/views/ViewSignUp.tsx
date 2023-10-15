"use client";

import { Grid, Link, Typography, Box, Divider } from "@mui/material";

import {
    GoogleSigninButton,
    FacebookSigninButton,
    CustomTextField,
    CustomButton,
    PageContainer,
} from "@/components";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import {
    validateEmail,
    validateName,
    validatePassword,
    validateStrongPassword,
} from "@/utils/regEx/patternValidation";

const ViewSignUp = () => {
    const router = useRouter();

    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<
        string | null
    >(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Clear the error state for the corresponding field when the user types
        const fieldName = event.target.name;
        if (fieldName === "name") {
            setNameError(null);
        } else if (fieldName === "email") {
            setEmailError(null);
        } else if (fieldName === "password") {
            setPasswordError(null);
        } else if (fieldName === "confirmPassword") {
            setConfirmPasswordError(null);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get("name");
        const email = data.get("email");
        const password = data.get("password");
        const confirmPassword = data.get("confirmPassword");

        if (!validateName(name as string)) {
            setNameError("Please enter a valid name");
        }
        if (!validateEmail(email as string)) {
            setEmailError("Please enter a valid email");
        }

        if (!validateStrongPassword(password as string)) {
            setPasswordError("Password does not meet requirements");
        }

        if (!validatePassword(password as string, confirmPassword as string)) {
            setConfirmPasswordError("Passwords do not match");
        }

        if (!name || !email || !password || !confirmPassword) {
            toast.error("Please fill all required fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("password doesn't match");
            return;
        }

        axios
            .post("/api/users", { name, email, password })
            .then((res) => {
                console.log(res.status);
                if (res.status === 201) {
                    console.log("works");
                    toast.warning(
                        "Please check your email to verify your account"
                    );
                    router.push("/auth/signin");
                }
            })
            .catch((error) => {
                console.error(error);
                throw new Error(error.message);
            });
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
                                error={nameError !== null}
                                errorText={nameError}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                                name="email"
                                type="email"
                                placeholder="Email (Required)"
                                error={emailError !== null}
                                errorText={emailError}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                                name="password"
                                type="password"
                                error={passwordError !== null}
                                errorText={passwordError}
                                placeholder="Password (Required)"
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                                name="confirmPassword"
                                type="password"
                                error={confirmPasswordError !== null}
                                errorText={confirmPasswordError}
                                placeholder="Confirm Password (Required)"
                                onChange={handleInputChange}
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
};

export default ViewSignUp;
