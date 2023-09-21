"use client";
import { Container, styled } from "@mui/material";
import React from "react";

const StyledWrapper = styled(Container)(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
        padding: "2rem",
    },
    [theme.breakpoints.up("xl")]: {
        width: "85vw",
        margin: "0 auto",
    },
}));

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <StyledWrapper>{children}</StyledWrapper>;
};

export default Layout;
