"use client";

import React, { useState } from "react";
import { Avatar, Typography, Button, Grid, Box } from "@mui/material";
import { CustomTextField, CustomDashboardCard } from "@/components";
import { useSession } from "next-auth/react";

const initialState = {
    name: "Misha",
    image: "",
    phone: "92384992374",
    email: "email@email.com",
    address: "address",
    city: "Cidty",
    postalCode: "T4T4Y5",
    country: "country",
};

const ProfileCard = () => {
    const [userData, setUserData] = useState(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const renderFields = Object.entries(userData).map(([key, value]) => (
        <Grid item xs={12} sm={6} key={key}>
            <CustomTextField name={key} value={value} onChange={handleChange} />
        </Grid>
    ));

    return (
        <CustomDashboardCard>
            <Grid container rowSpacing={3}>
                <Grid container item xs={12}>
                    <Grid
                        container
                        item
                        sm={8}
                        sx={{ alignItems: "center", justifyContent: "start" }}
                        columnSpacing={2}
                    >
                        <Grid item>
                            <Avatar
                                src={`${userData?.image}`}
                                alt={`${userData?.name}`}
                                sx={{
                                    width: 70,
                                    height: 70,
                                }}
                            />
                        </Grid>
                        <Grid container item xs={8}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body1"
                                    sx={{ marginLeft: 0.8 }}
                                >
                                    {userData?.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button size="small">Upload Photo</Button>
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
                            justifyContent: { xs: "space-around", sm: "end" },
                        }}
                    >
                        <Button size="small">Message</Button>
                        <Button size="small">Save</Button>
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
        </CustomDashboardCard>
    );
};

export default ProfileCard;
