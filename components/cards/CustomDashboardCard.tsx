"use client";
import React, { ReactNode } from "react";
import Card from "@mui/material/Card";

interface Props {
    children: ReactNode;
    onClick?: () => void;
    bgColor?: string;
    border?: string;
}

const CustomDashboardCard: React.FC<Props> = ({
    children,
    bgColor,
    onClick,
    border = "none",
}) => {
    return (
        <Card
            sx={{
                minWidth: 275,
                minHeight: "3rem",
                padding: "1rem",
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
