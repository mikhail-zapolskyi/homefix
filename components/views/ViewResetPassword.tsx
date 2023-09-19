"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { CustomButton, CustomTextField, PageContainer } from "@/components";
import { Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { isStrongPassword } from "@/utils/regEx/patterns";

interface IFormInput {
    password: string;
    confirmPassword: string;
}

const ViewResetPassword = ({ token }: { token: string }) => {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        const password = data.password;
        const confirmPassword = data.confirmPassword;

        if (!password || !confirmPassword) {
            toast.error("Please fill all required fields");
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
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item sm={12}>
                            <Controller
                                name="password"
                                control={control}
                                rules={{
                                    required: "Passowrd is required",
                                    pattern: isStrongPassword,
                                }}
                                render={({ field }) => (
                                    <CustomTextField
                                        {...field}
                                        type="password"
                                    />
                                )}
                            />
                            {errors.password?.type === "required" && (
                                <Typography color="error">
                                    {errors.password?.message}
                                </Typography>
                            )}
                            {errors.password?.type === "pattern" && (
                                <Typography color="error">
                                    Password doesn&apos;t match the requirements
                                </Typography>
                            )}
                        </Grid>
                        <Grid item sm={12}>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                rules={{
                                    required: "Confirm Password is required",
                                    pattern: isStrongPassword,
                                }}
                                render={({ field }) => (
                                    <CustomTextField
                                        {...field}
                                        type="password"
                                    />
                                )}
                            />
                            {errors.confirmPassword?.type === "required" && (
                                <Typography color="error">
                                    {errors.confirmPassword?.message}
                                </Typography>
                            )}
                            {errors.confirmPassword?.type === "pattern" && (
                                <Typography color="error">
                                    Confirm Password doesn&apos;t match the
                                    requirements
                                </Typography>
                            )}
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
