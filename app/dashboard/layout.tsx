"use client";
import React from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

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
    const { data: session } = useSession();

    // if (!session) {
    //     redirect("/");
    // }

    return <StyledWrapper container>{children}</StyledWrapper>;
};

export default DashboardLayout;
