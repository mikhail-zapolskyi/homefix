"use client";
import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

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

    useEffect(() => {
        if (!session && status === "unauthenticated") {
            toast.error("Please log in first");
            throw new Error("You don't have permissions to access this page");
        }
    }, [session, status]);

    return <StyledWrapper container>{children}</StyledWrapper>;
};

export default DashboardLayout;
