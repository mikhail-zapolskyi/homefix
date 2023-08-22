import { ImageUploadCard } from "@/components";
import { Grid } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";

interface ServiceProfileProps {
    data?: string;
}

const ServiceProfile: React.FC<ServiceProfileProps> = () => {
    const data = {
        image: "https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg",
    };

    const handleCallback = (file: File) => {
        if (!file) {
            return toast.error("Something went wrong");
        }

        console.log(file);
    };

    return (
        <Grid container>
            <Grid item xs={3}>
                <ImageUploadCard data={data} handleCallback={handleCallback} />
            </Grid>
        </Grid>
    );
};

export default ServiceProfile;
