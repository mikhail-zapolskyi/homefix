"use client";

import React from "react";
import { Loader, ViewServProPage } from "@/components";
import { toast } from "react-toastify";
import useSWR from "swr";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const Page = ({
    params,
}: {
    params: { userId: string };
}) => {
    const { userId } = params;

    return (
        <div>
            {userId}
        </div>
    )
};

export default Page;
