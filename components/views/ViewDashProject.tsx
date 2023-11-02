"use client";

import React, { FC } from "react";
import { Stack, Grid, Typography } from "@mui/material";
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
                toast.success("You approve a contractor to do your project");
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
                        onAccept={() => alert("connect end point to accept")}
                        onComplete={() =>
                            alert("connect end point to complete")
                        }
                        onDelete={() => alert("connect end point to delete")}
                    />
                    {props.service && !_.isEmpty(props.service) && (
                        <SectionWithTitle title="Requests sent">
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
                    {props.interested && !_.isEmpty(props.interested) && (
                        <SectionWithTitle title="Interested in project">
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
                </Stack>
            </Grid>
        </Grid>
    );
};

export default ViewDashProject;
