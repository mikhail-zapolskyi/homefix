"use client";
import React, { ReactNode } from "react";
import Card from "@mui/material/Card";

interface CustomDashboardCardProps {
    children: ReactNode;
}

const CustomDashboardCard: React.FC<CustomDashboardCardProps> = ({
    children,
}) => {
    return (
        <Card
            sx={{ minWidth: '275px', padding: "2rem", borderRadius: "1rem" }}
            elevation={4}
        >
            {children}
        </Card>
    );
};

export default CustomDashboardCard;
