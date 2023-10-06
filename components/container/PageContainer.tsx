import React from "react";
import { Breakpoint, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeroContainer = styled(Container)(({ theme }) => ({
    position: "relative",
    width: "100vw",
    maxWidth: "100%",
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    "@media (min-width:0px)": {
        "@media (orientation: landscape)": { height: "calc(100vh - 48px)" },
    },
    "@media (min-width:600px)": { height: "calc(100vh - 64px)" },
    maxHeight: "100%",
}));

interface PageContainerProps {
    children: React.ReactNode;
    maxWidth?: false | Breakpoint | undefined;
}

export const PageContainer = ({ children, maxWidth }: PageContainerProps) => {
    return <HeroContainer maxWidth={maxWidth}>{children}</HeroContainer>;
};

export default PageContainer;
