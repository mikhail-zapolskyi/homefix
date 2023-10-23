// This page process User Project Request for only choosen service profile.

"use client";

import { Loader } from "@/components";
import React from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const page = ({ params }: { params: { userId: string } }) => {
    const { userId } = params;
    const { data, error, isLoading, mutate } = useSWR(
        `/api/user/single`,
        fetcher,
        { revalidateOnFocus: true }
    );

    if (error) {
        toast.error(error);
    }

    return !isLoading && <div>User Project Request {userId}</div>;
};

export default page;
