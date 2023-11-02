"use client";

import { DashProjectCard, SectionWithTitle } from "@/components";
import { Grid } from "@mui/material";
import { Loader } from "@/components";
import React from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import _ from "lodash";
import { FullProjectType } from "@/app/types";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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

    return !_.isEmpty(data) ? (
        <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
                <SectionWithTitle title="Leads Board" />
            </Grid>
            <Grid container item xs={12} spacing={2}>
                {data.map((obj: FullProjectType) => (
                    <Grid item xs={12} lg={6} key={obj.id}>
                        <DashProjectCard
                            title={obj.title}
                            createdAt={obj.createdAt}
                            budget={obj.budget}
                            status={obj.status}
                            onProceedToProject={() => handleProceed(obj.id)}
                            interest={obj.interest}
                        />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    ) : (
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <SectionWithTitle title="You currently lack any leads" />
            </Grid>
        </Grid>
    );
};

export default Page;
