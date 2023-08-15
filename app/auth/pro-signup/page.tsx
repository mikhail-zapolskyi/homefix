"use client";

import { Grid, Link, Typography, Box } from "@mui/material";

import { CustomButton, CustomTextField, PageContainer } from "@/components";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";

export default function SignUp() {
    const router = useRouter();

    const { data: session, status } = useSession();

    if (session && status === "authenticated") {
        redirect("/");
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const name = data.get("name");
        const address = data.get("address");
        const city = data.get("city");
        const country = data.get("country");
        const phone = data.get("phone");
        const postalCode = data.get("postalCode");
        const password = data.get("password");
        const confirmPassword = data.get("confirmPassword");

        if (!email || !name || !password || !confirmPassword) {
            console.log("Please fill all fields");
        }

        if (password !== confirmPassword) {
            console.log("password doesn't match");
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
                                name="email"
                                placeholder="Email (Required)"
                                type="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                                name="name"
                                type="text"
                                placeholder="Name (Required)"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                                name="address"
                                type="text"
                                placeholder="Address (Required)"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                name="city"
                                type="text"
                                placeholder="City (Required)"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                name="postalCode"
                                type="text"
                                placeholder="Postal Code (Required)"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                name="country"
                                type="text"
                                placeholder="Country (Required)"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                name="phone"
                                type="text"
                                placeholder="Phone Number (Required)"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                                name="password"
                                type="password"
                                placeholder="Password (Required)"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password (Required)"
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
}
