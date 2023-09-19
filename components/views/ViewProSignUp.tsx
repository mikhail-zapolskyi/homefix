"use client";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Grid, Link, Typography, Box } from "@mui/material";
import { CustomButton, CustomTextField, PageContainer } from "@/components";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import {
    isEmail,
    isPhoneNumber,
    isPostalCode,
    isStrongPassword,
} from "@/utils/regEx/patterns";

interface IFormInput {
    email: string;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

const ViewProSignUp = () => {
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
        const address = data.address;
        const city = data.city;
        const country = data.country;
        const phone = data.phone;
        const postalCode = data.postalCode;
        const password = data.password;
        const confirmPassword = data.confirmPassword;

        if (!email || !name || !password || !confirmPassword) {
            toast.error("Please fill all required fields");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("password doesn't match");
            return;
        }

        axios
            .post("/api/users", {
                email,
                name,
                address,
                city,
                postalCode,
                country,
                phone,
                type: "PRO",
                password,
            })
            .then((res) => {
                console.log(res.status);

                if (res.status === 201) {
                    console.log("works");
                    toast.success("Signed up successfully");
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
                    height: "100%",
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
                                name="address"
                                control={control}
                                rules={{ required: "Address is required" }}
                                render={({ field }) => (
                                    <CustomTextField {...field} type="text" />
                                )}
                            />
                            {errors.address && (
                                <Typography color="error">
                                    {errors.address?.message}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="city"
                                control={control}
                                rules={{ required: "City is required" }}
                                render={({ field }) => (
                                    <CustomTextField {...field} type="text" />
                                )}
                            />
                            {errors.city && (
                                <Typography color="error">
                                    {errors.city?.message}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="postalCode"
                                control={control}
                                rules={{
                                    required: "Postal Code is required",
                                    pattern: isPostalCode,
                                }}
                                render={({ field }) => (
                                    <CustomTextField {...field} type="text" />
                                )}
                            />
                            {errors.postalCode?.type === "required" && (
                                <Typography color="error">
                                    {errors.postalCode?.message}
                                </Typography>
                            )}
                            {errors.postalCode?.type === "pattern" && (
                                <Typography color="error">
                                    Please enter a vaild postal code
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="country"
                                control={control}
                                rules={{ required: "Country is required" }}
                                render={({ field }) => (
                                    <CustomTextField {...field} type="text" />
                                )}
                            />
                            {errors.country && (
                                <Typography color="error">
                                    {errors.country?.message}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="phone"
                                control={control}
                                rules={{
                                    required: "Phone Number is required",
                                    pattern: isPhoneNumber,
                                }}
                                render={({ field }) => (
                                    <CustomTextField {...field} type="text" />
                                )}
                            />
                            {errors.phone?.type === "required" && (
                                <Typography color="error">
                                    {errors.phone?.message}
                                </Typography>
                            )}
                            {errors.phone?.type === "pattern" && (
                                <Typography color="error">
                                    Please enter a valid phone number
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
                        <Grid item xs={12}>
                            <CustomButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                text="Sign Up"
                            />
                        </Grid>
                        <Grid container item xs={12} justifyContent="flex-end">
                            <Grid item>
                                <Link href="signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </PageContainer>
    );
};

export default ViewProSignUp;
