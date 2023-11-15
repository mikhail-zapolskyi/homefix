import React, { FC } from "react";
import CustomDashboardCard from "../cards/CustomDashboardCard";
import { LinearProgress, Stack, Typography } from "@mui/material";
import { LinearProgressPropsColorOverrides } from "@mui/material/LinearProgress";
import _ from "lodash";

type Props = {
    title: string;
    progress: number | undefined;
    color:
        | "inherit"
        | "primary"
        | "secondary"
        | "info"
        | "error"
        | "success"
        | "warning"
        | "exellent"
        | "very_good"
        | "good"
        | "star"
        | "fair";
};

const StatsProgress: FC<Props> = ({ title, progress, color }) => {
    return (
        <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">
                    {title.replace(/_/g, "")}
                </Typography>
                <Typography variant="caption">{progress}</Typography>
            </Stack>
            <LinearProgress
                variant="determinate"
                value={progress || 0}
                color={color}
                sx={{
                    width: "100%",
                    height: "0.3rem",
                    borderRadius: "0.6rem",
                }}
                valueBuffer={100}
            />
        </Stack>
    );
};

export default StatsProgress;
