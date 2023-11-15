"use client";

import React, { FC } from "react";
import { Stack, Grid } from "@mui/material";
import {
    DashProjectCard,
    DashProjectServiceCard,
    SectionWithTitle,
} from "@/components";
import { FullProjectType } from "@/app/types";
import { ServiceProfile } from "@prisma/client";
import { useRouter } from "next/navigation";
import _ from "lodash";
import { KeyedMutator } from "swr";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

type Props = FullProjectType & {
    mutate: KeyedMutator<any>;
};

const ViewDashProject: FC<Props> = ({ ...props }) => {
    const router = useRouter();

    const handleApprove = async (
        serviceProfileId: string,
        projectId: string
    ) => {
        try {
            const response = await axios.put(
                `/api/projects/${projectId}/approve`,
                {
                    serviceProfileId,
                }
            );
            if (response.status === 200) {
                toast.success(
                    "You give your authorization to a contractor to undertake your project"
                );
                props.mutate();
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.error);
            }
        }
    };

    const handleAccept = async (projectId: string) => {
        try {
            const response = await axios.put(
                `/api/projects/${projectId}/accept`
            );
            if (response.status === 200) {
                toast.success(
                    `You've taken on a contractor project. 
                    Now, you have the opportunity to provide 
                    feedback. You'll be redirected to the review page in just 5 seconds`
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
                        onAccept={() => handleAccept(props.id)}
                        onDelete={() => alert("connect end point to delete")}
                    />
                    {props.approved &&
                        !_.isEmpty(props.approved) &&
                        props.status === "ACCEPTED" && (
                            <SectionWithTitle title="Please share your thoughts on the experience you had with this contractor/business.">
                                {props.approved.map((obj: ServiceProfile) => (
                                    <DashProjectServiceCard
                                        key={obj.id}
                                        name={obj.name}
                                        status={props.status}
                                        onProceed={() =>
                                            router.push(`/services/${obj.id}`)
                                        }
                                        onReview={() =>
                                            router.push(
                                                `/services/${obj.id}/review/${props.id}`
                                            )
                                        }
                                        onSendMessage={() =>
                                            alert(
                                                "need to connect end point message"
                                            )
                                        }
                                    />
                                ))}
                            </SectionWithTitle>
                        )}
                    {props.interested && !_.isEmpty(props.interested) && (
                        <SectionWithTitle
                            title="Interested in project"
                            color="primary.main"
                        >
                            {props.interested.map((obj: ServiceProfile) => (
                                <DashProjectServiceCard
                                    key={obj.id}
                                    name={obj.name}
                                    onProceed={() =>
                                        router.push(`/services/${obj.id}`)
                                    }
                                    onApprove={() =>
                                        handleApprove(obj.id, props.id)
                                    }
                                    onDecline={() =>
                                        alert(
                                            "Need to connect end point decline"
                                        )
                                    }
                                    onSendMessage={() =>
                                        alert(
                                            "need to connect end point message"
                                        )
                                    }
                                />
                            ))}
                        </SectionWithTitle>
                    )}
                    {props.service && !_.isEmpty(props.service) && (
                        <SectionWithTitle
                            title="Requests sent"
                            color="info.main"
                        >
                            {props.service.map((obj: ServiceProfile) => (
                                <DashProjectServiceCard
                                    key={obj.id}
                                    name={obj.name}
                                    onProceed={() =>
                                        router.push(`/services/${obj.id}`)
                                    }
                                />
                            ))}
                        </SectionWithTitle>
                    )}
                </Stack>
            </Grid>
        </Grid>
    );
};

export default ViewDashProject;
