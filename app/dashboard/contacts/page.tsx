"use client";
import { DashContactCard, Loader } from "@/components";
import { Grid } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";

import React, { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const page = () => {
    const { data: session } = useSession();
    const { data, error, isLoading, mutate } = useSWR(
        "/api/contacts",
        fetcher,
        {
            revalidateOnFocus: true,
        }
    );

    if (error) {
        toast.error(error.message);
    }

    const handleAcceptRequest = async (
        contactId: string,
        contactRequestId: string,
        sender: string
    ) => {
        try {
            const response = await axios.post("/api/contacts/request/accept", {
                contactId,
                contactRequestId,
                sender,
            });
            mutate();
            toast.success(response.data.message);
        } catch (error: any) {
            toast.error(error.response.data.error);
        }
    };

    const handleDeclineRequest = async (contactId: string, userId: string) => {
        try {
            const response = await axios.post("/api/contacts/request/decline", {
                contactId,
                userId,
            });
            mutate();
            toast.success(response.data.message);
        } catch (error: any) {
            toast.error(error.response.data.error);
        }
    };

    const handleDeleteContact = async (contactId: string, userId: string) => {
        try {
            const response = await axios.delete("/api/contacts/delete", {
                data: {
                    contactId,
                    userId,
                },
            });
            mutate();
            toast.success(response.data.message);
        } catch (error: any) {
            toast.error(error.response.data.error);
        }
    };

    return isLoading ? (
        <Loader />
    ) : (
        <Grid container justifyContent="center">
            <Grid container item xs={12} spacing={2}>
                {data &&
                    data.map((obj: Record<string, any>) => (
                        <Grid item xs={12} md={4} key={obj.id}>
                            <DashContactCard
                                currentUserId={session?.user.id}
                                sender={obj.contactRequest.sender}
                                userName={obj.user.name}
                                userImage={obj.user.image}
                                userType={obj.user.type}
                                contactData={obj.createdAt}
                                request_status={
                                    obj.contactRequest.request_status
                                }
                                serviceProfile={obj.user.serviceProfile}
                                onAccept={() =>
                                    handleAcceptRequest(
                                        obj.id,
                                        obj.contactRequest.id,
                                        obj.contactRequest.sender
                                    )
                                }
                                onDecline={() =>
                                    handleDeclineRequest(obj.id, obj.user.id)
                                }
                                onDelete={() =>
                                    handleDeleteContact(obj.id, obj.user.id)
                                }
                            />
                        </Grid>
                    ))}
            </Grid>
        </Grid>
    );
};

export default page;
