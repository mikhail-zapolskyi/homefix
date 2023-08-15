"use client";

import React from "react";
import { ServiceProfile } from "@/components";
import { useSession } from "next-auth/react";

const Page = () => {
    const { data: session, status } = useSession();

    if (!session && status === "unauthenticated") {
        throw new Error("You don't have permissions to access this page");
    }
    return <ServiceProfile />;
};

export default Page;
