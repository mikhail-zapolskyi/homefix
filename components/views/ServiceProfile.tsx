import {
    DefaultFormEditCard,
    ImageUploadCard,
    LocationCard,
} from "@/components";
import { Grid } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface ServiceProfileProps {
    data?: string;
}
const initialState = {
    image: "https://images.pexels.com/photos/430205/pexels-photo-430205.jpeg",
    name: "New Service",
    email: "s@email.com",
    introduction:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut mauris vel tortor consequat facilisis. Nullam feugiat est nec justo varius, non fringilla libero.",
    experience: 24,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut mauris vel tortor consequat facilisis. Nullam feugiat est nec justo varius, non fringilla libero.",
    employees: 23,
    schedualPolicy:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut mauris vel tortor consequat facilisis. Nullam feugiat est nec justo varius, non fringilla libero.",
};

const ServiceProfile: React.FC<ServiceProfileProps> = () => {
    const [data, setData] = useState(initialState);

    const handleCallbackFile = (file: File) => {
        if (!file) {
            return toast.error("Something went wrong");
        }

        console.log(file);
    };

    const handleCallbackFormDetails = (details: Record<string, any>) => {
        if (!details) {
            return toast.error("Something went wrong");
        }

        console.log(details);
    };

    return (
        <Grid container rowSpacing={2}>
            <Grid container item spacing={2} sx={{ justifyContent: "center" }}>
                <Grid item xs={12} lg={3}>
                    <ImageUploadCard
                        data={data}
                        handleCallback={handleCallbackFile}
                    />
                </Grid>
                <Grid item xs={12} lg={9}>
                    <DefaultFormEditCard
                        data={data}
                        title="Service Profile Details"
                        handleCallback={handleCallbackFormDetails}
                    />
                </Grid>
            </Grid>
            <Grid container item spacing={2} sx={{ justifyContent: "center" }}>
                <Grid item xs={12} lg={3}></Grid>
                <Grid item xs={12} lg={9}>
                    <LocationCard />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ServiceProfile;
