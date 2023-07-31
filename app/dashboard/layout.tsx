"use client";
import React from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material";

const StyledWrapper = styled(Grid)(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
        padding: "2rem",
    },
    [theme.breakpoints.up("xl")]: {
        width: "65vw",
        margin: "0 auto",
    },
}));

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return <StyledWrapper container>{children}</StyledWrapper>;
};

export default DashboardLayout;
