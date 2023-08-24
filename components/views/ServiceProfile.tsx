"use client";
import {
    CustomDashboardCard,
    DefaultFormEditCard,
    FormPublishEditCard,
    ImageUploadCard,
    Loader,
    LocationCard,
} from "@/components";
import { filterEmptyValues } from "@/utils/helpers/filterEmptyValues";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());
const initialResponse = {
    name: "",
    email: "",
    phone: "",
    rating: 0,
    introduction: "",
    experience: 0,
    bio: "",
    image: "",
    specialtiesDo: [],
    specialtiesNo: [],
    employees: 0,
    hiredTimes: 0,
    bgChecked: false,
    paymentMethods: [],
    schedualPolicy: "",
    businessHours: [
        {
            type: "Monday",
            from: Date,
            to: Date,
        },
    ],
    reviews: [],
    posts: [],
    categories: [],
    location: [],
    customers: [],
    published: false,
};

const ServiceProfile = () => {
    const { data, error, isLoading } = useSWR("/api/service/single", fetcher);
    const [formData, setFormData] = useState(initialResponse);

    if (error) {
        toast.error(error.message);
    }

    useEffect(() => {
        setFormData({ ...formData, ...data });
    }, [data]);

    const handleCallbackFile = (file: File) => {
        if (!file) {
            return toast.error("Something went wrong");
        }

        console.log(file);
        toast("Image updated");
    };

    const handleCallbackFormDetails = (details: Record<string, any>) => {
        if (!details) {
            return toast.error("Something went wrong");
        }
        const newData = { ...formData, ...details };

        setFormData(newData);
        const notEmptyData = filterEmptyValues(newData);

        console.log(notEmptyData);
        try {
            toast.promise(axios.put("/api/service", notEmptyData), {
                success: "Changes Saved",
                error: "Something went wrong",
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    return isLoading ? (
        <Loader />
    ) : (
        <Grid container spacing={2}>
            <Grid container item spacing={2} sx={{ justifyContent: "center" }}>
                <Grid container item xs={12} lg={3} spacing={2}>
                    <Grid item xs={12}>
                        <ImageUploadCard
                            data={formData}
                            handleCallback={handleCallbackFile}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormPublishEditCard
                            data={formData}
                            handleCallback={handleCallbackFormDetails}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={9}>
                    <DefaultFormEditCard
                        data={{
                            name: formData?.name,
                            email: formData?.email,
                            phone: formData?.phone,
                            introduction: formData?.introduction,
                            bio: formData?.bio,
                            experience: formData?.experience,
                            employees: formData?.employees,
                            schedualPolicy: formData?.schedualPolicy,
                        }}
                        title="Service Profile Details"
                        handleCallback={handleCallbackFormDetails}
                        isLoading={isLoading}
                    />
                </Grid>
            </Grid>
            <Grid container item spacing={2} sx={{ justifyContent: "end" }}>
                <Grid item xs={12} lg={9}>
                    <CustomDashboardCard>Location</CustomDashboardCard>
                </Grid>
            </Grid>
            <Grid container item spacing={2} sx={{ justifyContent: "end" }}>
                <Grid item xs={12} lg={9}>
                    <CustomDashboardCard>
                        <Typography>
                            Category:{" "}
                            {formData.categories.map((i) => (
                                <span>{i}</span>
                            ))}
                        </Typography>
                        <Typography>
                            Specialties do:{" "}
                            {formData.specialtiesDo.map((i) => (
                                <span>{i}</span>
                            ))}
                        </Typography>
                        <Typography>
                            Specialties don't do:{" "}
                            {formData.specialtiesNo.map((i) => (
                                <span>{i}</span>
                            ))}
                        </Typography>
                        <Typography>
                            paymentMethods:{" "}
                            {formData.paymentMethods.map((i) => (
                                <span>{i}</span>
                            ))}
                        </Typography>
                    </CustomDashboardCard>
                </Grid>
            </Grid>
            <Grid container item spacing={2} sx={{ justifyContent: "end" }}>
                <Grid item xs={12} lg={9}>
                    <CustomDashboardCard>
                        <Typography>
                            Business Hours:
                            {formData.businessHours.map((i) => (
                                <span>{i.type}</span>
                            ))}
                        </Typography>
                    </CustomDashboardCard>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ServiceProfile;
