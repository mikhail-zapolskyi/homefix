"use client";

import React, { useEffect } from "react";
import { LocationCard, ProfileCard } from "@/components";
import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const Profile = () => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (!session && status === "unauthenticated") {
            toast.error("Please log in first");
            throw new Error("You don't have permissions to access this page");
        }
    }, [session, status]);

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
