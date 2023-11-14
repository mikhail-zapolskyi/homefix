"use client";

import { FullProjectType } from "@/app/types";
import {
    CustomButton,
    DashProjectCard,
    SectionWithTitle,
    ShowBreadcrumbs,
    ProjectsTable,
} from "@/components";
import { Grid } from "@mui/material";
import { Loader } from "@/components";
import React from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import _ from "lodash";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Plus } from "lucide-react";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const Page = () => {
    const router = useRouter();
    const { data, error, isLoading, mutate } = useSWR(
        "/api/projects",
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
        router.push(`/dashboard/projects/${projectId}`);
    };

    const handleDelete = async (projectId: string) => {
        try {
            const response = await axios.delete(
                `/api/projects/${projectId}/delete`
            );
            if (response.status === 200) {
                toast.success("Project deleted");
                mutate();
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.error);
            }
        }
    };

    const handleBundleDelete = async (projectIds: string[]) => {
        try {
            const response = await axios.delete(`/api/projects/`, {
                data: { projectIds },
            });
            if (response.status === 200) {
                toast.success("Projects deleted");
                mutate();
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.error);
            }
        }
    };

    const renderCreateProjectButton = (
        <CustomButton
            text="Create New Project"
            padsize="none"
            variant="outlined"
            onClick={() => router.push("/projects/quote/multi-request")}
            startIcon={<Plus />}
        />
    );

    return (
        <Grid container justifyContent="center" spacing={2}>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={12} sm={8}>
                    <SectionWithTitle title="Projects">
                        <ShowBreadcrumbs />
                    </SectionWithTitle>
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    sm={4}
                    justifyContent="end"
                    alignItems="center"
                >
                    {renderCreateProjectButton}
                </Grid>
                <Grid item xs={12}>
                    <ProjectsTable
                        count={data.count}
                        projects={data.projects}
                        onProceedToProject={handleProceed}
                        onDelete={handleDelete}
                        onBundleDelete={handleBundleDelete}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Page;
