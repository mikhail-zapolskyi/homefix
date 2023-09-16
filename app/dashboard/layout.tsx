"use client";
import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components";

const StyledWrapper = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
        padding: "2rem",
    },
    [theme.breakpoints.up("xl")]: {
        width: "85vw",
        margin: "0 auto",
    },
}));

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session && status === "unauthenticated") {
            router.push("/");
        }
    }, [session, status, router]);

    return session && status === "authenticated" ? (
        <StyledWrapper container>{children}</StyledWrapper>
    ) : (
        <Loader />
    );
};

export default DashboardLayout;
