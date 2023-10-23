"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session && status === "unauthenticated") {
            router.push("/auth/signin");
        }
    }, [session, status, router]);

    return <PageContainer maxWidth="sm">{children}</PageContainer>;
};

export default DashboardLayout;
