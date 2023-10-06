"use client";

import { Grid, Link, Typography, Box, SelectChangeEvent } from "@mui/material";
import { CustomButton, CustomTextField, PageContainer } from "@/components";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { SelectField } from "@/components";
import { useEffect, useState } from "react";
import useSWR from "swr";
import {
    validateEmail,
    validateName,
    validatePassword,
    validatePhoneNumber,
    validatePostalCode,
    validateStrongPassword,
} from "@/utils/regEx/patternValidation";

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

const ViewProSignUp = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<Form>({ type: "PRO" });
    const [locationParams, setLocationParams] = useState("");
    const {
        data: location,
        error,
        isLoading,
    } = useSWR(`/api/location${locationParams}`, fetcher, {});

    if (error) {
        redirect("/auth/pro-signup");
    }

    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [postalCodeError, setPostalCodeError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<
        string | null
    >(null);

    useEffect(() => {
        setLocationParams(
            `?country=${formData?.country}&state=${formData?.state}`
        );
    }, [formData?.country, formData?.state]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {
            name,
            email,
            address,
            postalCode,
            phone,
            password,
            confirmPassword,
        } = formData;

        if (!validateName(name as string)) {
            setNameError("Please enter a valid name");
        }
        if (!validateEmail(email as string)) {
            setEmailError("Please enter a valid email");
        }

        if (!validatePostalCode(postalCode as string)) {
            setPostalCodeError("Please enter a valid Postal Code");
        }

        if (!validatePhoneNumber(phone as string)) {
            setPhoneError("Please enter a valid phone number");
        }

        if (!validateStrongPassword(password as string)) {
            setPasswordError("Password does not meet requirements");
        }

        if (!validatePassword(password as string, confirmPassword as string)) {
            setConfirmPasswordError("Passwords do not match");
        }

        if (!email || !name || !password || !confirmPassword) {
            toast.error("Please fill all required fields");
            return;
        }

        if (password !== confirmPassword) {
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

        // Clear the error state for the corresponding field when the user types
        const fieldName = e.target.name;
        if (fieldName === "name") {
            setNameError(null);
        } else if (fieldName === "email") {
            setEmailError(null);
        } else if (fieldName === "postalCode") {
            setPostalCodeError(null);
        } else if (fieldName === "phone") {
            setPhoneError(null);
        } else if (fieldName === "password") {
            setPasswordError(null);
        } else if (fieldName === "confirmPassword") {
            setConfirmPasswordError(null);
        }
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
                                    error={emailError !== null}
                                    errorText={emailError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomTextField
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormData}
                                    error={nameError !== null}
                                    errorText={nameError}
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
                                    error={postalCodeError !== null}
                                    errorText={postalCodeError}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomTextField
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleFormData}
                                    error={phoneError !== null}
                                    errorText={phoneError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomTextField
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleFormData}
                                    error={passwordError !== null}
                                    errorText={passwordError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomTextField
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleFormData}
                                    error={confirmPasswordError !== null}
                                    errorText={confirmPasswordError}
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
};

export default ViewProSignUp;
