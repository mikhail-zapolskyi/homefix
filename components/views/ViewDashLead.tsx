"use client";

import React, { FC } from "react";
import { Stack, Grid } from "@mui/material";
import { DashProjectCard } from "@/components";
import { FullProjectType } from "@/app/types";
import { useRouter } from "next/navigation";
import { KeyedMutator, mutate } from "swr";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

type Props = FullProjectType & {
    mutate: KeyedMutator<any>;
};

const ViewDashLead: FC<Props> = ({ ...props }) => {
    const router = useRouter();

    const handleInterest = async (projectId: string) => {
        try {
            const response = await axios.put(
                `/api/projects/${projectId}/interest`
            );

            if (response.status === 200) {
                toast.success("Your interest in the project has been sent");
                props.mutate();
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
                props.mutate();
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
                props.mutate();
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.error);
            }
        }
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
                <Stack spacing={2}>
                    <DashProjectCard
                        title={props.title}
                        createdAt={props.createdAt}
                        budget={props.budget}
                        status={props.status}
                        content={props.content}
                        approved={props.approved}
                        user={props.user}
                        onProceedToUserProfile={() =>
                            router.push(`/users/${props.user.id}`)
                        }
                        onInterest={() => handleInterest(props.id)}
                        onInprogress={() => handleInprogress(props.id)}
                        onComplete={() => handleComplete(props.id)}
                        onSendMessage={() => {}}
                    />
                </Stack>
            </Grid>
        </Grid>
    );
};

export default ViewDashLead;
