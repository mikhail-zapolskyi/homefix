"use client";

import React, { useEffect } from "react";
import { ServiceProfile } from "@/components";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const Page = () => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (!session && status === "unauthenticated") {
            toast.error("Please log in first");
            throw new Error("You don't have permissions to access this page");
        }
    }, [session, status]);

    return <ServiceProfile />;
};

export default Page;
