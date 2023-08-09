"use client";

import { LocationCard, ProfileCard } from "@/components";
import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import React from "react";

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
