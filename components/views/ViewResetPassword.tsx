"use client";

import { CustomButton, CustomTextField, PageContainer } from "@/components";
import {
    validatePassword,
    validateStrongPassword,
} from "@/utils/regEx/patternValidation";
import { Box, Grid, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ViewResetPassword = () => {
    const router = useRouter();
    const [token, setToken] = useState("");

    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<
        string | null
    >(null);

    const searchParams = useSearchParams();

    useEffect(() => {
        const hashedToken = searchParams.get("token");

        setToken(hashedToken || "");
    }, [searchParams]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name;
        if (fieldName === "password") {
            setPasswordError(null);
        } else if (fieldName === "confirmPassword") {
            setConfirmPasswordError(null);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const password = data.get("password");
        const confirmPassword = data.get("confirmPassword");

        if (!validateStrongPassword(password as string)) {
            setPasswordError("Password does not meet requirements");
        }

        if (!validatePassword(password as string, confirmPassword as string)) {
            setConfirmPasswordError("Passwords do not match");
        }

        if (!password || !confirmPassword) {
            toast.error("Please fill all required fields");
            return;
        }

        if (!validateStrongPassword(password as string)) {
            toast.error("password is weak");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("password doesn't match");
            return;
        }

        if (token.length > 0) {
            const resetUserPassword = async () => {
                try {
                    const req = async () =>
                        await fetch(
                            "http://localhost:3000/api/users/reset-password",
                            {
                                method: "PUT",
                                body: JSON.stringify({ token, password }),
                            }
                        );

                    toast.promise(req(), {
                        pending: "Updating password",
                        success: "Password updated successfully!",
                        error: "Something went wrong",
                    });

                    router.push("/auth/signin");
                } catch (error: any) {
                    console.log(error);
                    throw new Error(error.message);
                }
            };
            resetUserPassword();
        }
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
                    Reset your password
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
                                name="password"
                                type="password"
                                placeholder="Password (Required)"
                                error={passwordError !== null}
                                errorText={passwordError}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <CustomTextField
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password (Required)"
                                error={confirmPasswordError !== null}
                                errorText={confirmPasswordError}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item sm={12}>
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
                    <CustomButton
                        type="submit"
                        fullWidth={true}
                        variant="contained"
                        text="Reset password"
                    />
                </Box>
            </Box>
        </PageContainer>
    );
};

export default ViewResetPassword;
