"use client";

import { Grid, Button, Link, Typography, Container, Box } from "@mui/material";

import { CustomTextField, CustomPasswordField } from "@/components";
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
            .catch((error) => console.error(error));
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
                            <CustomPasswordField
                                name="password"
                                placeholder="Password (Required)"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomPasswordField
                                name="confirmPassword"
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
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
