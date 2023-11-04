"use client";
import { FullContactType } from "@/app/types";
import { DashContactCard, Loader } from "@/components";
import { Grid } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const page = () => {
    const router = useRouter();
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
                    data.map((obj: FullContactType) => (
                        <Grid item xs={12} md={6} lg={4} key={obj.id}>
                            <DashContactCard
                                currentUserId={session?.user.id}
                                data={obj}
                                sender={obj.contactRequest[0].sender}
                                userName={obj.user[0].name}
                                userImage={obj.user[0].image}
                                userType={obj.user[0].type}
                                contactDate={obj.createdAt}
                                request_status={
                                    obj.contactRequest[0].request_status
                                }
                                serviceProfile={obj.user[0].serviceProfile}
                                onAccept={() =>
                                    handleAcceptRequest(
                                        obj.id,
                                        obj.contactRequest[0].id,
                                        obj.contactRequest[0].sender
                                    )
                                }
                                onDecline={() =>
                                    handleDeclineRequest(obj.id, obj.user[0].id)
                                }
                                onDelete={() =>
                                    handleDeleteContact(obj.id, obj.user[0].id)
                                }
                                onSendMessage={() =>
                                    alert(" NEED END POINT FOR SENDING MESSAGE")
                                }
                                onSendProjectRequest={() =>
                                    obj.user[0].serviceProfile &&
                                    router.push(
                                        `/projects/quote/${obj.user[0].serviceProfile.id}`
                                    )
                                }
                            />
                        </Grid>
                    ))}
            </Grid>
        </Grid>
    );
};

export default page;
