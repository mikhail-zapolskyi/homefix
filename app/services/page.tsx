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

    const followBusiness = async (serviceProfileId: any) => {
        const data = { serviceProfileId, userId: session?.user.id };

        if (!data) {
            toast.error(
                "Something went wrong. Service Profile Id or User Id missing"
            );
        }

        try {
            // await axios.post(
            //     "http://localhost:3000/api/users/businesses",
            //     {
            //         serviceProfileId,
            //     }
            // );
            toast.success("You are following this account now");
            const response = await axios.post(
                "http://localhost:3000/api/contacts/request/send",
                data
            );
            console.log(response);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.warning(error.response?.data.error);
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
                        activeUserId={session?.user.id}
                        onView={() =>
                            router.push(`/services/${serviceProfile.id}`)
                        }
                        onFollow={() => followBusiness(serviceProfile.id)}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default ViewServices;
