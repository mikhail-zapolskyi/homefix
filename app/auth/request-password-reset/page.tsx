"use client";

import { CustomTextField } from "@/components";

import { Box, Button, Container, Grid, Typography } from "@mui/material";
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
                    Forgot your password?
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
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Request password change
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default RequestPasswordReset;
