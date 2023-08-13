"use client";

import { CustomButton, CustomTextField, PageContainer } from "@/components";

import { Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const RequestPasswordReset = async () => {
    const router = useRouter();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");

        if (!email) {
            console.log("Email required");
            return;
        }

        try {
            await fetch("http://localhost:3000/api/users/reset-password", {
                method: "POST",
                body: JSON.stringify(email),
            });

            router.push("/");
        } catch (error: any) {
            console.log(error);
        }

        // await sendEmail(email.toString(), "reset");
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
                    Forgot your password?
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
                            <CustomButton
                                type="submit"
                                fullWidth={true}
                                variant="contained"
                                text="Request Password Reset"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </PageContainer>
    );
};

export default RequestPasswordReset;
