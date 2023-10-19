"use client";
import React from "react";
import { Container, Breakpoint } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)(({ theme }) => ({
    height: "100%",

    [theme.breakpoints.up("md")]: {
        padding: "2rem",
    },
}));

interface Props {
    children: React.ReactNode;
    maxWidth?: false | Breakpoint | undefined;
}

export const DashboardContainer = ({ children, maxWidth = false }: Props) => {
    return (
        <StyledContainer disableGutters maxWidth={maxWidth}>
            {children}
        </StyledContainer>
    );
};

export default DashboardContainer;
