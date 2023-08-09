"use client";

import React from "react";
import { LocationCard, ProfileCard } from "@/components";
import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Profile = () => {
    const { data: session } = useSession();

    if (!session) {
        redirect("/");
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
