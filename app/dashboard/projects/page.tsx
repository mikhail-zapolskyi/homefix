"use client";

import { FullProjectType } from "@/app/types";
import { CustomButton, DashProjectCard, SectionWithTitle } from "@/components";
import { Grid } from "@mui/material";
import { Loader } from "@/components";
import React from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import _ from "lodash";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

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
                toast.error(error.response?.data.message);
            }
        }
    };

    const renderCreateProjectButton = (
        <CustomButton
            text="Create Project and Send Request"
            padsize="none"
            variant="contained"
            width="18rem"
            onClick={() => router.push("/projects/quote/multi-request")}
        />
    );

    return (
        <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
                <SectionWithTitle
                    title={`Projects Board / Currently you have ${data.length} projects`}
                >
                    {renderCreateProjectButton}
                </SectionWithTitle>
            </Grid>
            {!_.isEmpty(data) && (
                <Grid container item xs={12} spacing={2}>
                    {data.map((obj: FullProjectType) => (
                        <Grid item xs={12} lg={6} key={obj.id}>
                            <DashProjectCard
                                title={obj.title}
                                createdAt={obj.createdAt}
                                budget={obj.budget}
                                status={obj.status}
                                interested={obj.interested}
                                onProceedToProject={() => handleProceed(obj.id)}
                                onDelete={() => handleDelete(obj.id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Grid>
    );
};

export default Page;
