"use client"
import { Stack, Typography } from "@mui/material";
import React from "react";

interface SectionWithTitleProps {
    title?: string;
    children?: React.ReactNode;
    variant?: "h1" | "h2" | "h3" | "h4";
}

const SectionWithTitle: React.FC<SectionWithTitleProps> = ({
    title,
    children,
    variant = "h2",
}) => {
    return (
        <Stack direction="column" spacing={2}>
            {title && <Typography variant={variant}>{title}</Typography>}
            {children}
        </Stack>
    );
};

export default SectionWithTitle;
