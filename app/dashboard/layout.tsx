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

    return (
        <PageContainer>
            {session && status === "authenticated" && (
                <DashboardContainer maxWidth={"lg"}>
                    {children}
                </DashboardContainer>
            )}
        </PageContainer>
    );
};

export default DashboardLayout;
