"use client";

import React, { useState } from "react";
import { Box, Button, Divider, Grid, SelectChangeEvent } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { SelectFiled } from "@/components";

const request = {
    cities: ["Calgary", "Boston", "Kiev", "New York"],
    postalCodes: ["T3M1N8", "90210"],
    categories: ["Plumbers", "Cleaners"],
    countries: ["Canada", "US", "Ukraine"],
};

const initialParams = {
    country: "",
    city: "",
    postalCode: "",
    category: "",
    rating: "",
};

const SearchBar = () => {
    const router = useRouter();
    const [formData, setFormData] = useState(initialParams);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let query = "?";
        const params = new URLSearchParams();

        Object.keys(formData).forEach((key) => {
            console.log(formData[key as keyof typeof formData]);
            if (formData[key as keyof typeof formData]) {
                params.set(key, formData[key as keyof typeof formData]);
            }
        });

        const queryString = params.toString();
        if (queryString) {
            query = query + queryString;
        }
        router.push(`/services${query}`);
    };

    const handleSelectOnChange = (
        e: SelectChangeEvent<unknown | string | number>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Box
            component="form"
            noValidate
            sx={{ display: "flex", alignItems: "center" }}
            onSubmit={handleSubmit}
        >
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <SelectFiled
                        id="country"
                        name="country"
                        emptyValue="Select Country"
                        value={formData.country}
                        array={request.countries}
                        onChange={handleSelectOnChange}
                    />
                </Grid>
                <Divider
                    sx={{ width: "85%", mx: "auto", fontSize: ".7rem" }}
                ></Divider>
                <Grid item xs={12}>
                    <SelectFiled
                        id="city"
                        name="city"
                        emptyValue="Select City"
                        value={formData.city}
                        array={request.cities}
                        onChange={handleSelectOnChange}
                    />
                </Grid>
                <Divider
                    sx={{ width: "85%", mx: "auto", fontSize: ".7rem" }}
                ></Divider>
                {/* <Grid item xs={12}>
                    <SelectFiled
                        id="postalCode"
                        name="postalCode"
                        emptyValue="Select Postal Code"
                        value={formData.postalCode}
                        array={request.postalCodes}
                        onChange={handleSelectOnChange}
                    />
                </Grid>
                <Divider
                    sx={{ width: "85%", mx: "auto", fontSize: ".7rem" }}
                ></Divider> */}
                <Grid item xs={12}>
                    <SelectFiled
                        id="category"
                        name="category"
                        emptyValue="Select Category"
                        value={formData.category}
                        array={request.categories}
                        onChange={handleSelectOnChange}
                    />
                </Grid>
                <Divider
                    sx={{ width: "85%", mx: "auto", fontSize: ".7rem" }}
                ></Divider>
                <Grid item xs={12}>
                    <SelectFiled
                        id="rating"
                        name="rating"
                        emptyValue="Select Rating"
                        value={formData.rating}
                        array={[1, 2, 3, 4, 5]}
                        onChange={handleSelectOnChange}
                    />
                </Grid>

                <Grid container item xs={12} sx={{ justifyContent: "end" }}>
                    <Button size="large" type="submit">
                        Search a Pro
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SearchBar;
