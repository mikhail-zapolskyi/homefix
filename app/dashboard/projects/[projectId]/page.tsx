"use client";

import { Loader, ViewDashProject } from "@/components";
import React from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const Page = ({ params }: { params: { projectId: string } }) => {
    const { projectId } = params;
    const { data, error, isLoading, mutate } = useSWR(
        `/api/projects/${projectId}/get`,
        fetcher,
        {
            revalidateOnFocus: true,
        }
    );

    if (error) {
        toast.error(error.message);
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <ViewDashProject
            id={data.id}
            title={data.title}
            content={data.content}
            budget={data.budget}
            createdAt={data.createdAt}
            status={data.status}
            categories={data.categories}
            specialties={data.specialties}
            interestedId={data.interestedId}
            approvedId={data.approvedId}
            serviceProfileId={data.serviceProfileId}
            userId={data.userId}
            service={data.service}
            interested={data.interested}
            approved={data.approved}
            mutate={() => mutate()}
        />
    );
};

export default Page;
