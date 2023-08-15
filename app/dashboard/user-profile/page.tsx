"use client";

import React from "react";
import { LocationCard, ProfileCard } from "@/components";
import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";

const Profile = () => {
    const { data: session, status } = useSession();

    if (!session && status === "unauthenticated") {
        throw new Error("You don't have permissions to access this page");
    }
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
