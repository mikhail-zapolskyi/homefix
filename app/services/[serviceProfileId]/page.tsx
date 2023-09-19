"use client";

import React from "react";
import { Loader, ViewServProPage } from "@/components";
import { toast } from "react-toastify";
import useSWR from "swr";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const ServiceProfilePage = ({
    params,
}: {
    params: { serviceProfileId: string };
}) => {
    const { serviceProfileId } = params;
    const { data, error, isLoading } = useSWR(
        `/api/service/${serviceProfileId}`,
        fetcher,
        {
            refreshInterval: 1000,
        }
    );

    if (error) {
        toast.error(error.message);
    }

    return isLoading ? <Loader /> : <ViewServProPage data={data} />;
};

export default ServiceProfilePage;
