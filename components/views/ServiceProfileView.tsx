// Import necessary libraries and components
"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ServiceProfile, Location, Day } from "@prisma/client";
import { filterEmptyValues } from "@/utils/helpers/filterEmptyValues";
import {
    DefaultEditCard,
    PublishProfileEditCard,
    ImageUploadCard,
    LocationCard,
    BusinessHoursEditCard,
    BusinessArrayInfoEditCard,
    CategoryEditCard,
} from "@/components";
import { Grid } from "@mui/material";

interface ServiceProfileViewProps {
    data?: ServiceProfile;
    location?: Location;
    businessHours?: Day[];
    categories?: Record<string, any>[];
}

// Define the ServiceProfile component
const ServiceProfileView: React.FC<ServiceProfileViewProps> = ({
    data,
    location,
    businessHours,
    categories,
}) => {
    // Use SWR to fetch data from "/api/service/single"
    const [formData, setFormData] = useState<ServiceProfile>();
    const [locationFormData, setLocationFormData] = useState<Location>();
    const [businessHoursFormData, setBusinessHoursFormData] = useState<Day[]>();
    const [categoriesFormData, setCategoriesFormData] =
        useState<Record<string, any>[]>();

    // Update states when data is fetched
    useEffect(() => {
        setFormData(data);
    }, [data]);

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
    const handleCallbackFile = (file: File) => {
        if (!file) {
            return toast.error("Something went wrong");
        }
        console.log(file);
        toast("Image updated");
    };

    // Callback function for handling form details
    const handleCallbackFormDetails = (details: Record<string, any>) => {
        if (!details) {
            return toast.error("Something went wrong");
        }
        const newData = { ...formData, ...details } as ServiceProfile;
        const notEmptyData = filterEmptyValues(newData);

        try {
            // Send a PUT request to update service data
            toast.promise(axios.put("/api/service", notEmptyData), {
                success: {
                    render({ data }) {
                        if (data) setFormData(data.data);
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
        if (!notEmptyData.serviceProfileId && formData) {
            notEmptyData.serviceProfileId = formData.id;
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
                            data={formData}
                            handleCallback={handleCallbackFile}
                        />
                    </Grid>
                    {/* Form Publish/Edit Card */}
                    <Grid item xs={12}>
                        <PublishProfileEditCard
                            data={formData}
                            handleCallback={handleCallbackFormDetails}
                        />
                    </Grid>
                </Grid>
                {/* Default Form Edit Card */}
                <Grid item xs={12} lg={9}>
                    <DefaultEditCard
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
                    />
                </Grid>
            </Grid>
            <Grid container item spacing={2} sx={{ justifyContent: "end" }}>
                <Grid item xs={12} lg={9}>
                    <LocationCard
                        location={
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
                        title="Business Location"
                        handleCallback={handleLocationSave}
                    />
                </Grid>
            </Grid>
            <Grid container item spacing={2} sx={{ justifyContent: "end" }}>
                <Grid item xs={12} lg={9}>
                    <BusinessHoursEditCard
                        businessHours={businessHoursFormData}
                        handleCallback={handleBusinessHoursSave}
                        handleDeleteDayCallback={handleDeleteDayCallback}
                    />
                </Grid>
            </Grid>
            <Grid container item spacing={2} sx={{ justifyContent: "end" }}>
                <Grid item xs={12} lg={9}>
                    <CategoryEditCard
                        data={categoriesFormData}
                        handleDeleteCallback={handleCategoryDelete}
                        handleCallback={handleCategorySave}
                    />
                </Grid>
            </Grid>
            <Grid container item spacing={2} sx={{ justifyContent: "end" }}>
                <Grid item xs={12} lg={9}>
                    <BusinessArrayInfoEditCard
                        arrays={{
                            specialties_Do: formData?.specialties_Do,
                            specialties_No: formData?.specialties_No,
                            payment_Methods: formData?.payment_Methods,
                        }}
                        handleCallback={handleCallbackFormDetails}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ServiceProfileView;
