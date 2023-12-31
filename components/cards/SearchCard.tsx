"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Grid, SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import { SelectField, Loader, CustomButton } from "@/components";
import useSWR from "swr";
import { URL } from "url";
import { toast } from "react-toastify";

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
    const {
        data: location,
        error: locationError,
        isLoading: locationIsLoading,
    } = useSWR(`/api/location${locationParams}`, fetcher, {});

    const {
        data: categories,
        error: categoriesError,
        isLoading: categoriesIsLoading,
    } = useSWR(`/api/category`, fetcher, {});

    useEffect(() => {
        setLocationParams(
            `?country=${formData.country}&state=${formData.state}&city=${formData.city}`
        );
    }, [formData.country, formData.state, formData.city]);

    if (locationError && categoriesError) return <div>Failed to load</div>;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.country) {
            toast.error("Please choose the country to start your search");
            return;
        }

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
            {locationIsLoading || categoriesIsLoading ? (
                <Loader />
            ) : (
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <SelectField
                            id="country"
                            name="country"
                            emptyValue="Select Country"
                            value={formData.country}
                            array={location.countries}
                            onChange={handleSelectOnChange}
                            fieldState={formData.postalCode ? true : false}
                        />
                    </Grid>
                    <Divider
                        sx={{ width: "85%", mx: "auto", fontSize: ".7rem" }}
                    ></Divider>
                    {location.states && location.states.length > 0 && (
                        <>
                            <Grid item xs={12}>
                                <SelectField
                                    id="state"
                                    name="state"
                                    emptyValue="Select State/Province"
                                    value={formData.state}
                                    array={location.states}
                                    onChange={handleSelectOnChange}
                                    fieldState={
                                        formData.postalCode ? true : false
                                    }
                                />
                            </Grid>
                            <Divider
                                sx={{
                                    width: "85%",
                                    mx: "auto",
                                    fontSize: ".7rem",
                                }}
                            ></Divider>
                        </>
                    )}
                    {location.cities && location.cities.length > 0 && (
                        <>
                            <Grid item xs={12}>
                                <SelectField
                                    id="city"
                                    name="city"
                                    emptyValue="Select City"
                                    value={formData.city}
                                    array={location.cities}
                                    onChange={handleSelectOnChange}
                                    fieldState={
                                        formData.postalCode ? true : false
                                    }
                                />
                            </Grid>
                            <Divider
                                sx={{
                                    width: "85%",
                                    mx: "auto",
                                    fontSize: ".7rem",
                                }}
                            ></Divider>
                        </>
                    )}

                    <Grid item xs={12}>
                        <SelectField
                            id="category"
                            name="category"
                            emptyValue="Select Category"
                            value={formData.category}
                            array={categories.map(
                                (i: Record<string, any>) => i.title
                            )}
                            onChange={handleSelectOnChange}
                            fieldState={
                                formData.country || formData.postalCode
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
                                formData.country || formData.postalCode
                                    ? false
                                    : true
                            }
                        />
                    </Grid>

                    <Grid
                        container
                        item
                        xs={12}
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 0,
                        }}
                        spacing={0}
                    >
                        <CustomButton
                            text="Find a Service Professional"
                            fullWidth={true}
                            variant="contained"
                            type="submit"
                        />
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default SearchBar;
