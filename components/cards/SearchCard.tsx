"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Box, Button, Divider, Grid, SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { SelectField } from "@/components";
import useSWR from "swr";
import { URL } from "url";

const GridLoaderClient = dynamic(() => import("react-spinners/GridLoader"), {
    ssr: false,
});

const fetcher = (url: URL) => fetch(url).then((res) => res.json());

const initialParams = {
    country: "",
    city: "",
    state: "",
    postalCode: "",
    category: "",
    rating: "",
};

const SearchBar = () => {
    const router = useRouter();
    const [locationParams, setLocationParams] = useState("");
    const [formData, setFormData] = useState(initialParams);
    const { data, error, isLoading } = useSWR(
        `/api/location${locationParams}`,
        fetcher
    );

    useEffect(() => {
        setLocationParams(
            `?country=${formData.country}&state=${formData.state}`
        );
    }, [formData.country, formData.state]);

    if (error) return <div>Failed to load</div>;

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
    console.log(formData);
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
                <GridLoaderClient
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
                            fieldState={formData.postalCode ? true : false}
                        />
                    </Grid>
                    <Divider
                        sx={{ width: "85%", mx: "auto", fontSize: ".7rem" }}
                    ></Divider>
                    <Grid item xs={12}>
                        <SelectField
                            id="state"
                            name="state"
                            emptyValue="Select State/Province"
                            value={formData.state}
                            array={data.states}
                            onChange={handleSelectOnChange}
                            fieldState={formData.country ? false : true}
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
                            fieldState={formData.state ? false : true}
                        />
                    </Grid>

                    <Divider
                        sx={{ width: "85%", mx: "auto", fontSize: ".7rem" }}
                    ></Divider>
                    <Grid item xs={12}>
                        <SelectField
                            id="category"
                            name="category"
                            emptyValue="Select Category"
                            value={formData.category}
                            array={[]}
                            onChange={handleSelectOnChange}
                            fieldState={
                                formData.state || formData.postalCode
                                    ? false
                                    : true
                            }
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
                            fieldState={
                                formData.state || formData.postalCode
                                    ? false
                                    : true
                            }
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
