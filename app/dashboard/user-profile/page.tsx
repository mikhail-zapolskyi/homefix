"use client";

import { Loader, ViewDashUserPro } from "@/components";
import useSWR from "swr";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const UserProfile = () => {
    const { data, error, isLoading } = useSWR("/api/users/single", fetcher);

    if (error) {
        throw new Error(error.message);
    }

    return isLoading ? (
        <Loader />
    ) : (
        <ViewDashUserPro userProfile={data} location={data.location[0]} />
    );
};

export default UserProfile;
