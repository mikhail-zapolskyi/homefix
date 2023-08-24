// Import necessary libraries and components
"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import axios from "axios";
import { ServiceProfile } from "@prisma/client";
import { filterEmptyValues } from "@/utils/helpers/filterEmptyValues";
import {
    CustomDashboardCard,
    DefaultFormEditCard,
    FormPublishEditCard,
    ImageUploadCard,
    Loader,
} from "@/components";
import { Grid } from "@mui/material";

// Define a function to fetch data from an API endpoint using SWR
const fetcher = (url: URL) => fetch(url).then((r) => r.json());

// Define the ServiceProfile component
const ServiceProfile = () => {
    // Use SWR to fetch data from "/api/service/single"
    const { data, error, isLoading } = useSWR("/api/service/single", fetcher);
    const [formData, setFormData] = useState<ServiceProfile>();

    // Display an error message using React-toastify if there is an error
    if (error) {
        toast.error(error.message);
    }

    // Update formData when data is fetched
    useEffect(() => {
        setFormData({ ...formData, ...data });
    }, [data]);

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
        setFormData(newData);
        const notEmptyData = filterEmptyValues(newData);

        try {
            // Send a PUT request to update service data
            toast.promise(axios.put("/api/service", notEmptyData), {
                success: "Changes Saved",
                error: "Something went wrong",
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    // Render a loading spinner while data is being fetched
    return isLoading ? (
        <Loader />
    ) : (
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
                        <FormPublishEditCard
                            data={formData}
                            handleCallback={handleCallbackFormDetails}
                        />
                    </Grid>
                </Grid>
                {/* Default Form Edit Card */}
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
            {/* Other sections may be added here */}
        </Grid>
    );
};

export default ServiceProfile;
