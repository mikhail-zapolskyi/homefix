"use client";
import { Loader, UserReviewsView } from "@/components";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useSWR from "swr";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const UserReviews = () => {
    const router = useRouter();
    const { data, error, isLoading, mutate } = useSWR("/api/reviews", fetcher, {
        revalidateOnFocus: true,
    });

    if (error) {
        toast.error(error.message);
    }

    if (isLoading) {
        return <Loader />;
    }
    console.log(data);
    return <UserReviewsView review={data} />;
};

export default UserReviews;
