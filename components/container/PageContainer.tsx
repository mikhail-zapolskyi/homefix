"use client";
import React from "react";
import { Breakpoint, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)(({ theme }) => ({
    position: "relative",
    width: "100vw",
    maxWidth: "100%",
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    "@media (min-width:0px)": {
        height: "calc(100vh - 48px)",
        "@media (orientation: landscape)": { height: "calc(100vh - 48px)" },
    },
    "@media (min-width:600px) and (min-height:900px)": {
        height: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
    },
    maxHeight: "100%",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
        display: "none",
    },
}));

interface Props {
    children: React.ReactNode;
    maxWidth?: false | Breakpoint | undefined;
}

export const PageContainer = ({ children, maxWidth = false }: Props) => {
    return (
        <StyledContainer maxWidth={maxWidth} disableGutters>
            {children}
        </StyledContainer>
    );
};

export default PageContainer;
