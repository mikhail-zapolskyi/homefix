"use client";

import { FullProjectType } from "@/app/types";
import { DashProjectCard, SectionWithTitle } from "@/components";
import { Box, Grid, Typography } from "@mui/material";
import { Loader } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { ServiceProfile } from "@prisma/client";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const Page = () => {
    const router = useRouter();
    const { data, error, isLoading, mutate } = useSWR(
        "/api/projects/projects",
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
        router.push(`/projects/${projectId}`);
    };
    const handleDelete = (projectId: string, service: ServiceProfile[]) => {
        console.log(projectId, service);
    };

    return !_.isEmpty(data) ? (
        <>
            <Grid container justifyContent="center">
                <Grid container item xs={12} spacing={2}>
                    <Grid item xs={12}>
                        <SectionWithTitle title="Projects Board" />
                    </Grid>
                    {data.map((obj: FullProjectType) => (
                        <Grid item xs={4} key={obj.id}>
                            <DashProjectCard
                                data={obj}
                                onProceed={() => handleProceed(obj.id)}
                                onDelete={() =>
                                    handleDelete(obj.id, obj.service)
                                }
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </>
    ) : (
        <SectionWithTitle title="You currently lack any ongoing projects" />
    );
};

export default Page;
