// Import necessary libraries and components
"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { ServiceProfile, Location, Day } from "@prisma/client";
import { filterEmptyValues } from "@/utils/helpers/filterEmptyValues";
import {
    ViewEditDefaultCard,
    PublishProfileEditCard,
    ImageUploadCard,
    ViewEditLocation,
    ViewEditBusinessHours,
    ViewEditArrayData,
    ViewEditCategory,
} from "@/components";
import { Grid, Stack } from "@mui/material";
import { KeyedMutator } from "swr";

interface Props {
    serviceProfile?: ServiceProfile;
    location?: Location;
    businessHours?: Day[];
    categories?: Record<string, any>[];
    mutate: KeyedMutator<any>;
}

// Define the ServiceProfile component
const ViewDashServPro: React.FC<Props> = ({
    serviceProfile,
    location,
    businessHours,
    categories,
    mutate,
}) => {
    // Use SWR to fetch data from "/api/service/single"
    const [serviceProfileFormData, setServiceProfileFormData] =
        useState<ServiceProfile>();
    const [locationFormData, setLocationFormData] = useState<Location>();
    const [businessHoursFormData, setBusinessHoursFormData] = useState<Day[]>();
    const [categoriesFormData, setCategoriesFormData] =
        useState<Record<string, any>[]>();

    // Update states when data is fetched
    useEffect(() => {
        setServiceProfileFormData(serviceProfile);
    }, [serviceProfile]);

    useEffect(() => {
        setLocationFormData(location);
    }, [location]);

    useEffect(() => {
        setBusinessHoursFormData(businessHours);
    }, [businessHours]);

    useEffect(() => {
        setCategoriesFormData(categories);
    }, [categories]);

    // Callback function for handling uploaded image
    const handleSaveProfileImage = async (file: File) => {
        if (!file) {
            return toast.error("Something went wrong");
        }

        const data = new FormData();
        data.append("file", file);

        try {
            const response = await axios.put("/api/service/image-upload", data);

            if (response.status === 200) {
                mutate();
                toast.success("Changes Saved");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.message);
            }
        }
    };

    // Callback function for handling form details
    const handleCallbackFormDetails = async (data: Record<string, any>) => {
        if (!data) {
            return toast.error("Something went wrong");
        }
        const newData = {
            ...serviceProfileFormData,
            ...data,
        } as ServiceProfile;
        const notEmptyData = filterEmptyValues(newData);

        try {
            const response = await axios.put("/api/service", notEmptyData);

            if (response.status === 200) {
                mutate();
                toast.success("Changes Saved");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.message);
            }
        }
    };

    const handleDeleteServiceProfileDetails = async (
        data: Record<string, any>
    ) => {
        const key = Object.keys(data)[0];
        if (key === "employees" || key === "experience") {
            data[`${key}`] = 0;
        }
        try {
            const response = await axios.put("/api/service", data);

            if (response.status === 200) {
                mutate();
                toast.success("Changes Saved");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.message);
            }
        }
    };

    const handleLocationSave = async (data: Record<string, any>) => {
        const notEmptyData = filterEmptyValues(data);
        if (!notEmptyData.serviceProfileId && serviceProfileFormData) {
            notEmptyData.serviceProfileId = serviceProfileFormData.id;
        }
        try {
            const response = await axios.put("/api/location", notEmptyData);

            if (response.status === 200) {
                mutate();
                toast.success("Changes Saved");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.message);
            }
        }
    };

    const handleBusinessHoursSave = async (data: Record<string, any>[]) => {
        try {
            const response = await axios.put(
                "/api/service/business-hours",
                data
            );

            if (response.status === 200) {
                mutate();
                toast.success("Changes Saved");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.message);
            }
        }
    };

    const handleDeleteDayCallback = async (data: Record<string, any>) => {
        if (!data.id) {
            return;
        }
        try {
            const response = await axios.delete(
                `/api/service/business-hours/${data.id}`
            );

            if (response.status === 204) {
                mutate();
                toast.success("Hours Deleted");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.message);
            }
        }
    };

    const handleCategorySave = async (data: Record<string, any>) => {
        try {
            const response = await axios.post(`/api/service/category`, data);

            if (response.status === 200) {
                mutate();
                toast.success("Category Added");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.message);
            }
        }
    };

    const handleCategoryDelete = async (id: string) => {
        try {
            const response = await axios.delete(`/api/service/category/${id}`);

            if (response.status === 204) {
                mutate();
                toast.success("Category Added");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.message);
            }
        }
    };

    // Render a loading spinner while data is being fetched
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
                <Stack spacing={4} sx={{ width: "100%" }}>
                    {/* Image Upload Card */}
                    <ImageUploadCard
                        data={serviceProfileFormData}
                        handleCallback={handleSaveProfileImage}
                    />
                    {/* Form Publish/Edit Card */}
                    <PublishProfileEditCard
                        data={serviceProfileFormData}
                        handleCallback={handleCallbackFormDetails}
                    />
                </Stack>
            </Grid>
            <Grid container item spacing={2} xs={12} lg={9}>
                {/* Default Form Edit Card */}
                <Grid item xs={12}>
                    <ViewEditDefaultCard
                        data={{
                            name: serviceProfileFormData?.name,
                            email: serviceProfileFormData?.email,
                            phone: serviceProfileFormData?.phone,
                            introduction: serviceProfileFormData?.introduction,
                            bio: serviceProfileFormData?.bio,
                            experience: serviceProfileFormData?.experience,
                            employees: serviceProfileFormData?.employees,
                            schedule_policy:
                                serviceProfileFormData?.schedule_policy,
                        }}
                        title="Service Profile Details"
                        saveCallback={handleCallbackFormDetails}
                        deleteCallback={handleDeleteServiceProfileDetails}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ViewEditLocation
                        title="Business Location"
                        data={
                            locationFormData
                                ? {
                                      address: locationFormData.address,
                                      city: locationFormData.city,
                                      state: locationFormData.state,
                                      country: locationFormData.country,
                                      postalCode: locationFormData.postalCode,
                                  }
                                : {}
                        }
                        updateCallback={handleLocationSave}
                    />
                </Grid>
            </Grid>
            <Grid container item spacing={2} sx={{ justifyContent: "end" }}>
                <Grid item xs={12} lg={9}>
                    <ViewEditBusinessHours
                        businessHours={businessHoursFormData}
                        handleSaveDayCallback={handleBusinessHoursSave}
                        handleDeleteDayCallback={handleDeleteDayCallback}
                    />
                </Grid>
            </Grid>
            <Grid container item spacing={2} sx={{ justifyContent: "end" }}>
                <Grid item xs={12} lg={9}>
                    <ViewEditCategory
                        data={categoriesFormData}
                        handleDeleteCallback={handleCategoryDelete}
                        handleCallback={handleCategorySave}
                    />
                </Grid>
            </Grid>
            <Grid container item spacing={2} sx={{ justifyContent: "end" }}>
                <Grid item xs={12} lg={9}>
                    <ViewEditArrayData
                        arrays={{
                            specialties_Do:
                                serviceProfileFormData?.specialties_Do,
                            specialties_No:
                                serviceProfileFormData?.specialties_No,
                            payment_methods:
                                serviceProfileFormData?.payment_methods,
                        }}
                        handleCallback={handleCallbackFormDetails}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ViewDashServPro;
