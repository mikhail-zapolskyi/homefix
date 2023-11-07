import { Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { FC, useEffect, useState } from "react";
import CustomDashboardCard from "./CustomDashboardCard";
import { TrendingUp, TrendingDown } from "lucide-react";
import _ from "lodash";
import { Bar, BarChart, Tooltip } from "recharts";

type Props = {
    title: string;
    number1: number;
    number2: number;
    barColor?: "primary" | "secondary" | "info" | "star";
    data: Record<string, any>[];
};

const CustomTooltip = ({
    active,
    payload,
}: {
    active?: any;
    payload?: any;
}) => {
    if (active && payload && payload.length) {
        return (
            <Typography className="label">{`${payload[0].payload.name} (${payload[0].value})`}</Typography>
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

    const color = {
        primary: `${theme.palette.primary.light}`,
        secondary: `${theme.palette.secondary.light}`,
        info: `${theme.palette.info.light}`,
        star: `${theme.palette.star.main}`,
    };

    useEffect(() => {
        if (!_.isNaN(number1) && number1 >= 0) {
            setIsPositive(true);
        } else {
            setIsPositive(false);
        }
    }, [number1]);

    return (
        <CustomDashboardCard>
            <Grid container direction="row" alignItems="center">
                <Grid item xs={8}>
                    <Typography variant="caption">{title}</Typography>
                    <Stack direction="row" spacing={2}>
                        {isPositive ? (
                            <TrendingUp
                                size={40}
                                color={`${theme.palette.primary.light}`}
                            />
                        ) : (
                            <TrendingDown
                                size={40}
                                color={`${theme.palette.error.main}`}
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
