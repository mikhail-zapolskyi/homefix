"use client";

import { Grid, Link, Typography, Box, SelectChangeEvent } from "@mui/material";
import { CustomButton, CustomTextField, PageContainer } from "@/components";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { SelectField } from "@/components";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: URL) => fetch(url).then((res) => res.json());

interface Form {
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
    address?: string;
    phone?: string;
    country?: string;
    state?: string;
    city?: string;
    postalCode?: string;
    type: "PRO";
}

export default function SignUp() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [formData, setFormData] = useState<Form>({ type: "PRO" });
    const [locationParams, setLocationParams] = useState("");
    const {
        data: location,
        error,
        isLoading,
    } = useSWR(`/api/location${locationParams}`, fetcher);

    if (session && status === "authenticated") {
        redirect("/");
    }

    if (error) {
        redirect("/auth/pro-signup");
    }

    useEffect(() => {
        setLocationParams(
            `?country=${formData?.country}&state=${formData?.state}`
        );
    }, [formData?.country, formData?.state]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (
            !formData.email ||
            !formData.name ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            toast.error("Please fill all required fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("password doesn't match");
            return;
        }

        delete formData.confirmPassword;

        axios
            .post("/api/users", formData)
            .then((res) => {
                console.log(res.status);

                if (res.status === 201) {
                    toast.success("Signed up successfully");
                    setFormData({ type: "PRO" });
                    router.push("/auth/signin");
                }
            })
            .catch((error) => {
                console.error(error);
                throw new Error(error.message);
            });
    };

    const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let value: string | number = e.target.value;

        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSelectOnChange = (
        e: SelectChangeEvent<unknown | string | number>
    ) => {
        const { name, value } = e.target;

        if (name === "country") {
            setFormData({
                ...formData,
                [name as string]: value,
                state: "",
                city: "",
            });
        } else if (name === "state") {
            setFormData({ ...formData, [name as string]: value, city: "" });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <PageContainer maxWidth={"md"}>
            {formData && !isLoading && (
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
                                    type="email"
                                    value={formData.email}
                                    onChange={handleFormData}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomTextField
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormData}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomTextField
                                    name="address"
                                    value={formData.address}
                                    onChange={handleFormData}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectField
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    array={location.countries}
                                    onChange={handleSelectOnChange}
                                    border={true}
                                    label={true}
                                    fieldState={false}
                                    padSize="default"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectField
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    array={location.states}
                                    onChange={handleSelectOnChange}
                                    border={true}
                                    label={true}
                                    fieldState={formData.country ? false : true}
                                    padSize="default"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <SelectField
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    array={location.cities}
                                    onChange={handleSelectOnChange}
                                    border={true}
                                    label={true}
                                    fieldState={formData.state ? false : true}
                                    padSize="default"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomTextField
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleFormData}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomTextField
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleFormData}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomTextField
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleFormData}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomTextField
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleFormData}
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
                            <Grid
                                container
                                item
                                xs={12}
                                justifyContent="flex-end"
                            >
                                <Grid item>
                                    <Link href="signin" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            )}
        </PageContainer>
    );
}
