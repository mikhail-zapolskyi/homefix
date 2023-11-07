"use client";
import { Stack, Typography } from "@mui/material";
import React from "react";

interface SectionWithTitleProps {
    title?: string;
    children?: React.ReactNode;
    variant?: "h1" | "h2" | "h3" | "h4";
    maxWidth?: string;
    color?: string;
}

const SectionWithTitle: React.FC<SectionWithTitleProps> = ({
    title,
    children,
    variant = "h2",
    maxWidth = "inherite",
    color,
}) => {
    return (
        <Stack direction="column" spacing={2} sx={{ maxWidth: maxWidth }}>
            {title && (
                <Typography variant={variant} color={color}>
                    {title}
                </Typography>
            )}
            {children}
        </Stack>
    );
};

export default SectionWithTitle;
