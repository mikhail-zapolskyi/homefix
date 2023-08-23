import {
    DefaultFormEditCard,
    ImageUploadCard,
    LocationCard,
} from "@/components";
import { Grid } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";

interface ServiceProfileProps {
    data?: string;
}

const ServiceProfile: React.FC<ServiceProfileProps> = () => {
    const data = {
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

    const handleCallback = (file: File) => {
        if (!file) {
            return toast.error("Something went wrong");
        }

        console.log(file);
    };

    return (
        <Grid container rowSpacing={2}>
            <Grid container item spacing={2} sx={{ justifyContent: "center" }}>
                <Grid item xs={12} lg={3}>
                    <ImageUploadCard
                        data={data}
                        handleCallback={handleCallback}
                    />
                </Grid>
                <Grid item xs={12} lg={9}>
                    <DefaultFormEditCard
                        data={data}
                        title="Service Profile Details"
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
