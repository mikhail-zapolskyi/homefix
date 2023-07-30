"use client";
import React from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material";

const StyledWrapper = styled(Grid)(({ theme }) => ({
    minWidth: "100%",
    [theme.breakpoints.up("sm")]: {
        padding: "2rem",
    },
}));

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return <StyledWrapper container>{children}</StyledWrapper>;
};

export default DashboardLayout;
