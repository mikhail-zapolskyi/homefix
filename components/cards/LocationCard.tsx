import React, { useEffect, useState } from "react";
import { CustomDashboardCard, CustomTextField, Loader } from "@/components";
import { Button, Grid, Typography } from "@mui/material";
import useSWR from "swr";
import axios from "axios";

const initialState = {
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
};

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const LocationCard = () => {
    const [formData, setformData] = useState(initialState);
    const { data, error, isLoading } = useSWR("/api/users", fetcher);

    if (error) {
        return <div>ERROR</div>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        const notEmptyData = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => value !== "")
        );

        try {
            await axios.put("/api/location", notEmptyData);
        } catch (error) {
            console.log(error);
        }
    };

    const renderFields = Object.entries(formData).map(([key, value]) => (
        <Grid item xs={12} sm={6} key={key}>
            <CustomTextField
                name={key}
                value={value}
                onChange={handleChange}
                placeholder={
                    (!isLoading && data.location && data.location[0][key]) ||
                    key
                }
            />
        </Grid>
    ));

    return (
        <CustomDashboardCard>
            {isLoading ? (
                <Loader />
            ) : (
                <Grid container rowSpacing={3}>
                    <Grid container item xs={12}>
                        <Grid
                            container
                            item
                            sm={8}
                            sx={{
                                alignItems: "center",
                                justifyContent: "start",
                            }}
                            columnSpacing={2}
                        >
                            <Grid container item xs={8}>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="h5"
                                        sx={{ marginLeft: 0.8 }}
                                    >
                                        Address
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={12}
                            sm={4}
                            sx={{
                                margin: "2rem auto",
                                alignItems: { xs: "center" },
                                justifyContent: {
                                    xs: "space-around",
                                    sm: "end",
                                },
                            }}
                        >
                            <Button size="small" onClick={handleSave}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        lg={8}
                        spacing={2}
                        sx={{ maxWidth: 600 }}
                    >
                        {renderFields}
                    </Grid>
                </Grid>
            )}
        </CustomDashboardCard>
    );
};

export default LocationCard;
