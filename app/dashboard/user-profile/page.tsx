"use client";

import { LocationCard, ProfileCard } from "@/components";
import { Grid } from "@mui/material";

const Profile = () => {
    return (
        <Grid container rowSpacing={2}>
            <Grid item xs={12}>
                <ProfileCard />
            </Grid>
            <Grid item xs={12}>
                <LocationCard />
            </Grid>
        </Grid>
    );
};

export default Profile;
