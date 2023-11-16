"use client";

import React from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { Box, Container, Grid } from "@mui/material";
import {
    CustomDashboardCard,
    DetailsCard,
    SearchedProfileCard,
    SectionWithTitle,
    ShowBreadcrumbs,
    UserProfileBanner,
} from "@/components";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const Page = ({
    params,
}: {
    params: { userId: string };
}) => {
    const { userId } = params;
    console.log()
    const { data, error, isLoading } = useSWR(
        `/api/users/${userId}`,
        fetcher,
        {
            refreshInterval: 1000,
        }
    );

    if (error) {
        toast.error(error.message);
    }
    return (
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <SectionWithTitle title="Projects">
                    <ShowBreadcrumbs />
                </SectionWithTitle>
            </Grid>
            <Grid item xs={12}>
                <UserProfileBanner />
            </Grid>
            {userId}
        </Grid>
    )
};

export default Page;
