"use client";

import { Loader, UserProfile } from "@/components";
import useSWR from "swr";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const Profile = () => {
    const { data, error, isLoading } = useSWR("/api/users/single", fetcher);

    if (error) {
        throw new Error(error.message);
    }

    return isLoading ? (
        <Loader />
    ) : (
        <UserProfile data={data} location={data.location[0]} />
    );
};

export default Profile;
