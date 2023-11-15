"use client";
import React, { ReactNode } from "react";
import Card from "@mui/material/Card";

interface Props {
    children: ReactNode;
    onClick?: () => void;
    bgColor?: string;
    border?: string;
    padding?: string;
    minHeight?: string;
    width?: string;
}

const CustomDashboardCard: React.FC<Props> = ({
    children,
    bgColor,
    onClick,
    border = "none",
    padding = "1rem",
    minHeight = "3rem",
    width = "inherit",
}) => {
    return (
        <Card
            sx={{
                width: width,
                minWidth: 275,
                minHeight: minHeight,
                padding: padding,
                borderRadius: "1rem",
                position: "relative",
                bgcolor: bgColor,
                border: border,
            }}
            elevation={4}
            onClick={onClick}
        >
            {children}
        </Card>
    );
};

export default CustomDashboardCard;
