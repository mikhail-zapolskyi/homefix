"use client";

import { Loader, ViewProUserDashboard, ViewUserDashboard } from "@/components";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import useSWR from "swr";

// Define a function to fetch data from an API endpoint using SWR
const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const Page = () => {
    const { data: session, status } = useSession();
    let url: string = "";

    if (session?.user.type === "PRO" && status === "authenticated")
        url = "/api/service/single";
    if (session?.user.type === "USER" && status === "authenticated")
        url = "/api/users/single";

    const { data, error, isLoading } = useSWR(url, fetcher, {
        refreshInterval: 1000,
    });

    if (error) {
        toast.error(error.message);
    }

    return isLoading ? (
        <Loader />
    ) : (
        <>
            {status === "authenticated" && session.user.type === "PRO" && (
                <ViewProUserDashboard data={data} />
            )}
            {status === "authenticated" && session.user.type === "USER" && (
                <ViewUserDashboard data={data} />
            )}
        </>
    );
};

export default Page;
