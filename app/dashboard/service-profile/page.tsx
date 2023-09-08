"use client";

import { Loader, ServiceProfileView } from "@/components";
import { toast } from "react-toastify";
import useSWR from "swr";

// Define a function to fetch data from an API endpoint using SWR
const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const Page = () => {
    const { data, error, isLoading } = useSWR("/api/service/single", fetcher, {
        refreshInterval: 1000,
    });

    if (error) {
        toast.error(error.message);
    }

    return isLoading ? (
        <Loader />
    ) : (
        <ServiceProfileView
            data={data}
            location={data.location[0]}
            businessHours={data.businessHours}
            categories={data.categories}
        />
    );
};

export default Page;
