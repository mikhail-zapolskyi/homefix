// Import necessary libraries and components
"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
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
import { Grid } from "@mui/material";

interface ViewDashServProProps {
    serviceProfile?: ServiceProfile;
    location?: Location;
    businessHours?: Day[];
    categories?: Record<string, any>[];
}

// Define the ServiceProfile component
const ViewDashServPro: React.FC<ViewDashServProProps> = ({
    serviceProfile,
    location,
    businessHours,
    categories,
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
    const handleSaveProfileImage = (file: File) => {
        if (!file) {
            return toast.error("Something went wrong");
        }

        const data = new FormData();
        data.append("file", file);

        try {
            toast.promise(axios.put("/api/service/image-upload", data), {
                success: {
                    render({ data }) {
                        if (data) setServiceProfileFormData(data.data);
                        return "Changes Saved";
                    },
                },
                error: "Something went wrong",
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    // Callback function for handling form details
    const handleCallbackFormDetails = (data: Record<string, any>) => {
        if (!data) {
            return toast.error("Something went wrong");
        }
        const newData = {
            ...serviceProfileFormData,
            ...data,
        } as ServiceProfile;
        const notEmptyData = filterEmptyValues(newData);
        try {
            // Send a PUT request to update service data
            toast.promise(axios.put("/api/service", notEmptyData), {
                success: {
                    render({ data }) {
                        if (data) setServiceProfileFormData(data.data);
                        return "Changes Saved";
                    },
                },
                error: "Something went wrong",
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const handleDeleteServiceProfileDetails = (data: Record<string, any>) => {
        const key = Object.keys(data)[0];
        if (key === "employees" || key === "experience") {
            data[`${key}`] = 0;
        }

        try {
            // Send a PUT request to update service data
            toast.promise(axios.put("/api/service", data), {
                success: {
                    render({ data }) {
                        if (data) setServiceProfileFormData(data.data);
                        return "Changes Saved";
                    },
                },
                error: "Something went wrong",
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const handleLocationSave = async (data: Record<string, any>) => {
        const notEmptyData = filterEmptyValues(data);
        if (!notEmptyData.serviceProfileId && serviceProfileFormData) {
            notEmptyData.serviceProfileId = serviceProfileFormData.id;
        }

        try {
            toast.promise(axios.put("/api/location", notEmptyData), {
                success: {
                    render({ data }) {
                        if (data) setLocationFormData(data.data);
                        return "Changes Saved";
                    },
                },
                error: "Something went wrong",
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const handleBusinessHoursSave = (data: Record<string, any>[]) => {
        try {
            toast.promise(axios.put("/api/service/business-hours", data), {
                success: {
                    render({ data }) {
                        if (data) setBusinessHoursFormData(data.data);
                        return "Changes Saved";
                    },
                },
                error: "Something went wrong",
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const handleDeleteDayCallback = (data: Record<string, any>) => {
        if (!data.id) {
            return;
        }

        try {
            toast.promise(
                axios.delete(`/api/service/business-hours/${data.id}`),
                {
                    success: "Changes Saved",
                    error: "Something went wrong",
                }
            );
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const handleCategorySave = (data: Record<string, any>) => {
        try {
            toast.promise(axios.post(`/api/service/category`, data), {
                success: "Category Added",
                error: "Something went wrong",
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const handleCategoryDelete = (id: string) => {
        try {
            toast.promise(axios.delete(`/api/service/category/${id}`), {
                success: "Category Deleted",
                error: "Something went wrong",
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    // Render a loading spinner while data is being fetched
    return (
        <Grid container spacing={2}>
            <Grid container item spacing={2} sx={{ justifyContent: "center" }}>
                {/* Image Upload Card */}
                <Grid container item xs={12} lg={3} spacing={2}>
                    <Grid item xs={12}>
                        <ImageUploadCard
                            data={serviceProfileFormData}
                            handleCallback={handleSaveProfileImage}
                        />
                    </Grid>
                    {/* Form Publish/Edit Card */}
                    <Grid item xs={12}>
                        <PublishProfileEditCard
                            data={serviceProfileFormData}
                            handleCallback={handleCallbackFormDetails}
                        />
                    </Grid>
                </Grid>
                {/* Default Form Edit Card */}
                <Grid item xs={12} lg={9}>
                    <ViewEditDefaultCard
                        data={{
                            name: serviceProfileFormData?.name,
                            email: serviceProfileFormData?.email,
                            phone: serviceProfileFormData?.phone,
                            introduction: serviceProfileFormData?.introduction,
                            bio: serviceProfileFormData?.bio,
                            experience: serviceProfileFormData?.experience,
                            employees: serviceProfileFormData?.employees,
                            schedualPolicy:
                                serviceProfileFormData?.schedualPolicy,
                        }}
                        title="Service Profile Details"
                        saveCallback={handleCallbackFormDetails}
                        deleteCallback={handleDeleteServiceProfileDetails}
                    />
                </Grid>
            </Grid>
            <Grid container item spacing={2} sx={{ justifyContent: "end" }}>
                <Grid item xs={12} lg={9}>
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
                            payment_Methods:
                                serviceProfileFormData?.payment_Methods,
                        }}
                        handleCallback={handleCallbackFormDetails}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ViewDashServPro;
