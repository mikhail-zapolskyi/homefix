"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader, ViewSearchServPro } from "@/components";
import useSWR from "swr";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const ViewServices = () => {
    const router = useRouter();
    const searchParams = useSearchParams().toString();
    const { data, error, isLoading } = useSWR(
        `/api/service?${searchParams}`,
        fetcher
    );

    if (error) {
        throw new Error(error.message);
    }

    const addToBusinesses = async (serviceProfileId: any) => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/users/businesses",
                {
                    method: "POST",
                    body: JSON.stringify(serviceProfileId),
                }
            );
            const data = await response.json();
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    return isLoading ? (
        <Loader />
    ) : (
        <Grid container spacing={2} pt={2}>
            {data.map((serviceProfile: Record<string, any>) => (
                <Grid item xs={12} key={serviceProfile.id} sx={{ py: "-4rem" }}>
                    <ViewSearchServPro
                        data={serviceProfile}
                        onView={() =>
                            router.push(`/services/${serviceProfile.id}`)
                        }
                        onFollow={() => addToBusinesses(serviceProfile.id)}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default ViewServices;
