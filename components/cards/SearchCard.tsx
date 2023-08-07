"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Grid, SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { SelectField } from "@/components";
import useSWR from "swr";
import { URL } from "url";
import { GridLoader } from "react-spinners";
import axios from "axios";

const fetcher = (url: URL) => fetch(url).then(async (res) => await res.json());

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
    const { data, isLoading, error } = useSWR(
        "http://localhost:3000/api/service/searchdata",
        fetcher
    );

    if (error) console.log(error);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let query = "?";
        const params = new URLSearchParams();

        Object.keys(formData).forEach((key) => {
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
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            onSubmit={handleSubmit}
        >
            {isLoading ? (
                <GridLoader
                    size={10}
                    cssOverride={{
                        marginTop: "3rem",
                    }}
                />
            ) : (
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <SelectField
                            id="country"
                            name="country"
                            emptyValue="Select Country"
                            value={formData.country}
                            array={data.countries}
                            onChange={handleSelectOnChange}
                        />
                    </Grid>
                    <Divider
                        sx={{ width: "85%", mx: "auto", fontSize: ".7rem" }}
                    ></Divider>
                    <Grid item xs={12}>
                        <SelectField
                            id="city"
                            name="city"
                            emptyValue="Select City"
                            value={formData.city}
                            array={data.cities}
                            onChange={handleSelectOnChange}
                        />
                    </Grid>
                    <Divider
                        sx={{ width: "85%", mx: "auto", fontSize: ".7rem" }}
                    ></Divider>
                    {/* <Grid item xs={12}>
                    <SelectField
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
                        <SelectField
                            id="category"
                            name="category"
                            emptyValue="Select Category"
                            value={formData.category}
                            array={data.categories}
                            onChange={handleSelectOnChange}
                        />
                    </Grid>
                    <Divider
                        sx={{ width: "85%", mx: "auto", fontSize: ".7rem" }}
                    ></Divider>
                    <Grid item xs={12}>
                        <SelectField
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
            )}
        </Box>
    );
};

export default SearchBar;
