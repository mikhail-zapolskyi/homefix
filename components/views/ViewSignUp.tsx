"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
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
import { isEmail, isStrongPassword } from "@/utils/regEx/patterns";

interface IFormInput {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}

const ViewSignUp = () => {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: {
            email: "",
            name: "",
            address: "",
            city: "",
            postalCode: "",
            country: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
    });
    const router = useRouter();

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        const email = data.email;
        const name = data.name;
        const password = data.password;
        const confirmPassword = data.confirmPassword;

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
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: "Name is required",
                                    minLength: 2,
                                    maxLength: 30,
                                }}
                                render={({ field }) => (
                                    <CustomTextField {...field} type="text" />
                                )}
                            />
                            {errors.name?.type === "required" && (
                                <Typography color="error">
                                    {errors.name?.message}
                                </Typography>
                            )}
                            {errors.name?.type === "minLength" && (
                                <Typography color="error">
                                    Name must be at least 2 letters long
                                </Typography>
                            )}
                            {errors.name?.type === "maxLength" && (
                                <Typography color="error">
                                    Name can not contain more than 30 letters
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Email is required",
                                    pattern: isEmail,
                                }}
                                render={({ field }) => (
                                    <CustomTextField {...field} type="email" />
                                )}
                            />
                            {errors.email?.type === "required" && (
                                <Typography color="error">
                                    {errors.email?.message}
                                </Typography>
                            )}
                            {errors.email?.type === "pattern" && (
                                <Typography color="error">
                                    Please enter a valid email
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
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
