"use client";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import CustomDashboardCard from "../cards/CustomDashboardCard";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Area,
    Tooltip,
} from "recharts";

interface Props {
    data?: Record<string, any>;
}

const ViewProUserDashboard: React.FC<Props> = ({ data }) => {
    return (
        data && (
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                flexWrap="wrap"
                justifyContent="center"
                alignItems="center"
            >
                <Stack justifyContent="center" alignItems="center">
                    <CustomDashboardCard>
                        <Stack alignItems="center" justifyContent="center">
                            <Stack direction="row" spacing={2}>
                                <Typography variant="body2">
                                    Total Rating: {data.stats.average_rating}
                                </Typography>
                                <Typography variant="body2">
                                    Total Reviews: {data.stats.total_reviews}
                                </Typography>
                            </Stack>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <RadarChart
                                    outerRadius={60}
                                    width={280}
                                    height={200}
                                    data={data.stats.ratings}
                                >
                                    <PolarGrid />
                                    <PolarAngleAxis
                                        dataKey="name"
                                        style={{
                                            fontSize: "0.8rem",
                                            fontWeight: 800,
                                        }}
                                    />
                                    <Radar
                                        name="Rating"
                                        dataKey="value"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        fillOpacity={0.6}
                                    />
                                </RadarChart>
                            </Box>
                        </Stack>
                    </CustomDashboardCard>
                </Stack>
                <Stack justifyContent="center" alignItems="center">
                    <CustomDashboardCard>
                        <Stack alignItems="center" justifyContent="center">
                            <Typography variant="body2">
                                New Customers
                            </Typography>
                            <AreaChart
                                width={280}
                                height={200}
                                data={data.stats.customers}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="colorUv"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#8884d8"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#8884d8"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                    <linearGradient
                                        id="colorPv"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#82ca9d"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#82ca9d"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="year"
                                    style={{
                                        fontSize: "0.8rem",
                                        fontWeight: 800,
                                    }}
                                />
                                <YAxis
                                    style={{
                                        fontSize: "0.8rem",
                                        fontWeight: 800,
                                    }}
                                />
                                <CartesianGrid strokeDasharray="1 1" />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#8884d8"
                                    fillOpacity={1}
                                    fill="url(#colorUv)"
                                />
                            </AreaChart>
                        </Stack>
                    </CustomDashboardCard>
                </Stack>
            </Stack>
        )
    );
};

export default ViewProUserDashboard;
