"use client";

import {
    DashProjectCard,
    LeadsTable,
    SectionWithTitle,
    ShowBreadcrumbs,
} from "@/components";
import { Grid } from "@mui/material";
import { Loader } from "@/components";
import React from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import _ from "lodash";
import { FullProjectType } from "@/app/types";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios, { AxiosError } from "axios";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const Page = () => {
    const router = useRouter();
    const { data, error, isLoading, mutate } = useSWR(
        "/api/projects/leads",
        fetcher,
        {
            revalidateOnFocus: true,
        }
    );

    if (error) {
        toast.error(error.message);
    }

    if (isLoading) {
        return <Loader />;
    }

    const handleProceed = (projectId: string) => {
        router.push(`/dashboard/leads/${projectId}`);
    };

    const handleExpressInterest = async (projectId: string) => {
        try {
            const response = await axios.put(
                `/api/projects/${projectId}/interest`
            );

            if (response.status === 200) {
                toast.success("Your interest in the project has been sent");
                mutate();
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.error);
            }
        }
    };

    const handleInprogress = async (projectId: string) => {
        try {
            const response = await axios.put(
                `/api/projects/${projectId}/inprogress`
            );

            if (response.status === 200) {
                toast.success(
                    "Great news! You're currently engaged in a project"
                );
                mutate();
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.error);
            }
        }
    };

    const handleComplete = async (projectId: string) => {
        try {
            const response = await axios.put(
                `/api/projects/${projectId}/completed`
            );

            if (response.status === 200) {
                toast.success(
                    `Great news! You're completed the project. 
                    Now, please remember to request the client 
                    to provide their feedback.`
                );
                mutate();
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.error);
            }
        }
    };

    return (
        <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
                <SectionWithTitle title="Leads">
                    <ShowBreadcrumbs />
                </SectionWithTitle>
            </Grid>
            <Grid item xs={12}>
                <LeadsTable
                    count={data.count}
                    projects={data.projects}
                    onProceedToProject={handleProceed}
                    onExpressInterest={handleExpressInterest}
                    onInprogress={handleInprogress}
                    onComplete={handleComplete}
                    onProceedToUserProfile={() =>
                        alert("NEED TO IMPLEMENT USER PROFILE")
                    }
                    onDelete={() => alert("NEED TO IMPLEMENT DELETE")}
                    onBundleDelete={() =>
                        alert("NEED TO IMPLEMENT BUNDLE DELETE")
                    }
                />
            </Grid>
        </Grid>
    );
};

export default Page;
