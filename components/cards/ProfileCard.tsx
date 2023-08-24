"use client";

import React, { useState } from "react";
import { Avatar, Typography, Button, Grid } from "@mui/material";
import {
    CustomTextField,
    CustomDashboardCard,
    Loader,
    CustomButton,
} from "@/components";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import axios from "axios";
import { toast } from "react-toastify";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const initialState = {
    name: "",
    phone: "",
    email: "",
    password: "",
};

const ProfileCard = () => {
    const [formData, setFormData] = useState(initialState);
    const { data: session, status } = useSession();
    const { data, error, isLoading } = useSWR("/api/users", fetcher);

    if (error) {
        throw new Error(error.message);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const renderFields = Object.entries(formData).map(([key, value]) => (
        <Grid item xs={12} sm={6} key={key}>
            <CustomTextField
                name={key}
                value={value}
                type={key === "password" ? "password" : undefined}
                onChange={handleChange}
                placeholder={
                    (!isLoading && key !== "password" && data[key]) || key
                }
            />
        </Grid>
    ));

    const handleSave = async () => {
        const notEmptyData = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => value !== "")
        );

        try {
            toast.promise(axios.put("/api/users", notEmptyData), {
                success: "Changes Saved",
                error: "Something went wrong",
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

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
                            <Grid item>
                                <Avatar
                                    src={`${session?.user.image}`}
                                    alt={`${formData?.name}`}
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
                                        {formData?.name || data.name}
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
                                justifyContent: {
                                    xs: "space-around",
                                    sm: "end",
                                },
                            }}
                        >
                            <CustomButton
                                size="small"
                                text="Message"
                                variant="text"
                            />
                            <CustomButton
                                size="small"
                                text="Save"
                                variant="text"
                                onClick={handleSave}
                            />
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

export default ProfileCard;
