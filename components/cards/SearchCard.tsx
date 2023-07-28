"use client";

import React, { useState } from "react";
import { Box, Button, Divider, Grid } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { SelectFiled } from "@/components";

const request = {
    cities: ["Calgary", "Boston", "Kiev", "New York"],
    postalCodes: ["T3M1N8", "90210"],
    categories: ["Plumbers", "Cleaners"],
    countries: ["Canada", "US", "Ukraine"],
};

const SearchBar = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [country, setCountry] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [postalCode, setPostalCode] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [rating, setRating] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const text = data.get("text") as string;
        const category = data.get("category") as string;

        // If query exists, pass it to as params
        let params = "";
        if (text && category) {
            const newUrlParams = new URLSearchParams(searchParams.toString());
            newUrlParams.set(`${category}`, text);
            params = `?${newUrlParams}`;
        }

        router.push(`/services${params}`);
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
                    <Grid item xs={12}>
                        <SelectFiled
                            id="country"
                            emptyValue="Select Country"
                            value={country}
                            array={request.countries}
                            onChange={(e) => {
                                setCountry(e.target.value as string);
                            }}
                        />
                    </Grid>
                </Grid>
                <Divider
                    sx={{ width: "85%", mx: "auto", fontSize: ".7rem" }}
                ></Divider>
                <Grid item xs={12}>
                    <SelectFiled
                        id="city"
                        emptyValue="Select City"
                        value={city}
                        array={request.cities}
                        onChange={(e) => {
                            setCity(e.target.value as string);
                        }}
                    />
                </Grid>
                <Divider
                    sx={{ width: "85%", mx: "auto", fontSize: ".7rem" }}
                ></Divider>
                <Grid item xs={12}>
                    <SelectFiled
                        id="postalCode"
                        emptyValue="Select Postal Code"
                        value={postalCode}
                        array={request.postalCodes}
                        onChange={(e) => {
                            setPostalCode(e.target.value as string);
                        }}
                    />
                </Grid>
                <Divider
                    sx={{ width: "85%", mx: "auto", fontSize: ".7rem" }}
                ></Divider>
                <Grid item xs={12}>
                    <SelectFiled
                        id="category"
                        emptyValue="Select Category"
                        value={category}
                        array={request.categories}
                        onChange={(e) => {
                            setCategory(e.target.value as string);
                        }}
                    />
                </Grid>
                <Divider
                    sx={{ width: "85%", mx: "auto", fontSize: ".7rem" }}
                ></Divider>
                <Grid item xs={12}>
                    <SelectFiled
                        id="rating"
                        emptyValue="Select Rating"
                        value={rating}
                        array={[1, 2, 3, 4, 5]}
                        onChange={(e) => {
                            setRating(e.target.value as string);
                        }}
                    />
                </Grid>

                <Grid container item xs={12} sx={{ justifyContent: "end" }}>
                    <Button size="large">Search a Pro</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SearchBar;
