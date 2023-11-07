// The StatsCard component is a React component used to display statistical data in a card-like format.
// It is designed to show two main pieces of information: a title, and two numerical values, with the first
// value represented as a percentage and an optional bar chart. It supports positive and negative trends using icons.

// Props
// title (string): The title to display at the top of the card.
// number1 (number): The first numerical value, typically representing a percentage. It is displayed with an up or down arrow icon based on its positivity/negativity.
// number2 (number): The second numerical value, which is displayed as-is.
// barColor (optional, string): An optional string representing the color of the bar chart. It can be one of the following values: "primary," "secondary," "info," or "star." Default is "primary."
// data (array of objects): An array of data objects used for rendering the bar chart. Each object should have a name and a value

import React, { FC, useEffect, useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { TrendingUp, TrendingDown } from "lucide-react";
import _ from "lodash";
import { Bar, BarChart, Tooltip } from "recharts";

import CustomDashboardCard from "./CustomDashboardCard";

// Define the Props interface for better type checking
interface Props {
    title: string;
    number1: number;
    number2: number;
    barColor?: "primary" | "secondary" | "info" | "star";
    data: { name: string; value: number }[];
}

// Create a separate CustomTooltip component
const CustomTooltip: FC<{ active?: any; payload?: any }> = ({
    active,
    payload,
}) => {
    if (active && payload && payload.length) {
        return (
            <Typography className="label">
                {`${payload[0].payload.name} (${payload[0].value})`}
            </Typography>
        );
    }
    return null;
};

const StatsCard: FC<Props> = ({
    title,
    number1,
    number2,
    barColor = "primary",
    data,
}) => {
    const theme = useTheme();
    const [isPositive, setIsPositive] = useState<boolean>(false);

    useEffect(() => {
        setIsPositive(!_.isNaN(number1) && number1 >= 0);
    }, [number1]);

    const color = {
        primary: theme.palette.primary.light,
        secondary: theme.palette.secondary.light,
        info: theme.palette.info.light,
        star: theme.palette.star.main,
    };

    return (
        <CustomDashboardCard>
            <Grid container direction="row" alignItems="center">
                <Grid item xs={8}>
                    <Typography variant="caption">{title}</Typography>
                    <Stack direction="row" spacing={2}>
                        {isPositive ? (
                            <TrendingUp
                                size={40}
                                color={theme.palette.primary.light}
                            />
                        ) : (
                            <TrendingDown
                                size={40}
                                color={theme.palette.error.main}
                            />
                        )}
                        <Typography variant="body1">{number1}%</Typography>
                    </Stack>
                    <Typography fontSize={40}>
                        {number2.toLocaleString("en-US")}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={4}
                    sx={{ width: "100%", height: "100%" }}
                    justifyContent="end"
                >
                    <BarChart width={60} height={100} data={data}>
                        <Bar
                            dataKey="value"
                            fill={color[barColor]}
                            barSize={2}
                        />
                        <Tooltip content={<CustomTooltip />} />
                    </BarChart>
                </Grid>
            </Grid>
        </CustomDashboardCard>
    );
};

export default StatsCard;
