"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DashboardContainer, Loader, PageContainer } from "@/components";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session && status === "unauthenticated") {
            router.push("/");
        }
    }, [session, status, router]);

    return session && status === "authenticated" ? (
        <PageContainer>
            <DashboardContainer>{children}</DashboardContainer>
        </PageContainer>
    ) : (
        <Loader />
    );
};

export default DashboardLayout;
