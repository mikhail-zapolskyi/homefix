"use client";

import { AuthContainer, CustomButton, CustomTextField } from "@/components";
import { validateEmail } from "@/utils/regEx/patternValidation";
import { Box, Grid, Stack, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const ViewReqPasswordReset = () => {
    const router = useRouter();
    const theme = useTheme();
    const [emailError, setEmailError] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "email") {
            setEmailError(null);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");

        if (!validateEmail(email as string)) {
            setEmailError("Please enter a valid email");
        }

        try {
            if (!email || !validateEmail(email as string)) {
                toast.error("Email required");
                return;
            }

            const req = async () =>
                await fetch("http://localhost:3000/api/users/reset-password", {
                    method: "POST",
                    body: JSON.stringify(email),
                });

            toast.promise(req(), {
                pending: "Requsting password reset",
                success: "Please check your email for password reset link!",
                error: "Something went wrong",
            });

            router.push("/");
        } catch (error: any) {
            console.log(error);
            throw new Error(error.message);
        }
    };

    return (
        <AuthContainer>
            <Typography component="h1" variant="h5" sx={{ padding: "1rem" }}>
                Forgot Password
            </Typography>
            <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ padding: "1rem" }}
            >
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <CustomTextField
                            name="email"
                            type="email"
                            placeholder="Email"
                            error={emailError !== null}
                            errorText={emailError}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomButton
                            type="submit"
                            fullWidth={true}
                            variant="contained"
                            text="Request Password Reset"
                        />
                    </Grid>
                </Grid>
            </Box>
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
                <Link href="signin" variant="body2" color="primary.dark">
                    Back to Sign In
                </Link>
            </Stack>
        </AuthContainer>
    );
};

export default ViewReqPasswordReset;
