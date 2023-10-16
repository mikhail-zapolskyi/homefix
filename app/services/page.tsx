"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader, SearchedProfileCard } from "@/components";
import useSWR from "swr";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const ViewServices = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const searchParams = useSearchParams().toString();
    const { data, error, isLoading } = useSWR(
        `/api/service?${searchParams}`,
        fetcher,
        {}
    );
    if (error) {
        throw new Error(error.message);
    }

    const handleContactRequest = async (userId: string) => {
        const data = { userId };

        if (!data) {
            toast.error("Something went wrong. User Id missing");
        }

        try {
            const response = await axios.post(
                "http://localhost:3000/api/contacts/request/send",
                data
            );

            if (response.status === 200) {
                toast.success(response.data.message);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.error);
            }
        }
    };

    return isLoading ? (
        <Loader />
    ) : (
        <Grid container spacing={2} pt={2}>
            {data.map((serviceProfile: Record<string, any>) => (
                <Grid item xs={12} key={serviceProfile.id} sx={{ py: "-4rem" }}>
                    <SearchedProfileCard
                        data={serviceProfile}
                        currentUser={session?.user.id}
                        serviceProfileUser={serviceProfile.userId}
                        onView={() =>
                            router.push(`/services/${serviceProfile.id}`)
                        }
                        onContactRequest={() =>
                            handleContactRequest(serviceProfile.userId)
                        }
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default ViewServices;
