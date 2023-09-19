"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { CustomButton, CustomTextField, PageContainer } from "@/components";
import { Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { isEmail } from "@/utils/regEx/patterns";

interface IFormInput {
    email: string;
}

const ViewRequestPasswordReset = () => {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {
            email: "",
        },
    });

    const router = useRouter();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const email = data.email;

        try {
            if (!email) {
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
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    pattern: isEmail,
                                }}
                                render={({ field }) => (
                                    <CustomTextField {...field} type="email" />
                                )}
                            />
                            {errors.email?.type === "pattern" && (
                                <Typography color="error">
                                    Please enter a valid email
                                </Typography>
                            )}
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

export default ViewRequestPasswordReset;
