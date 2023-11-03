"use client";
import {
    Divider,
    LinearProgress,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { FC, useCallback, useEffect, useState } from "react";

import { Review } from "@prisma/client";
import { useReviewCreteriaAverages } from "@/hooks";
import _ from "lodash";
import { explanation } from "@/assets/review/explanation";
import { ReviewCreationType } from "@/app/types";
import useDefineColorByRating from "@/hooks/useDefineColorByRating";
import { Star, MessageCircle } from "lucide-react";
import { useTheme } from "@mui/material/styles";

type Props = {
    number: number;
    array: Review[] | [];
};

const ProgressWithPercentage: FC<Props> = ({ number, array }) => {
    const theme = useTheme();
    const averages = useReviewCreteriaAverages(array);
    const color = useDefineColorByRating({ number });

    return (
        <Stack direction="column" spacing={1}>
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                divider={<Divider orientation="vertical" flexItem />}
            >
                <Stack
                    direction="column"
                    spacing={1}
                    sx={{ width: "100%" }}
                    justifyContent="center"
                >
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                        sx={{ minWidth: "30%" }}
                    >
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="caption">
                                Overall Rating
                            </Typography>
                            <Star color={`${theme.palette.info.main}`} />
                            <Typography variant="caption">
                                ({number}%)
                            </Typography>
                        </Stack>
                        <LinearProgress
                            variant="determinate"
                            value={number}
                            color={color}
                            sx={{
                                width: { xs: "100%", md: "70%" },
                                height: "1.4rem",
                                borderRadius: "0.6rem",
                            }}
                            valueBuffer={100}
                        />
                    </Stack>
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                        sx={{ minWidth: "30%" }}
                    >
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="caption">
                                Total Reviews
                            </Typography>
                            <MessageCircle
                                color={`${theme.palette.primary.light}`}
                            />
                            <Typography variant="caption">
                                ({array.length !== 0 ? `${array.length}` : 0})
                            </Typography>
                        </Stack>
                        <LinearProgress
                            variant="determinate"
                            value={
                                array.length !== 0
                                    ? array.length
                                    : array.length > 100
                                    ? 100
                                    : 0
                            }
                            color="primary"
                            sx={{
                                width: { xs: "100%", md: "70%" },
                                height: "1.4rem",
                                borderRadius: "0.6rem",
                            }}
                            valueBuffer={100}
                        />
                    </Stack>
                    <Divider orientation="horizontal" flexItem />
                    {Object.entries(averages).map(([key, value]) => {
                        if (value !== null && typeof value === "number") {
                            const color = useDefineColorByRating({
                                number: value,
                            });
                            return (
                                <Stack
                                    key={key}
                                    direction={{ xs: "column", md: "row" }}
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={1}
                                    sx={{ minWidth: "30%" }}
                                >
                                    <Tooltip
                                        title={
                                            <Typography variant="body1">
                                                {
                                                    explanation[
                                                        key as keyof ReviewCreationType
                                                    ]
                                                }
                                            </Typography>
                                        }
                                        placement="top"
                                    >
                                        <Typography>
                                            {`${_.startCase(
                                                _.replace(key, "_", " ")
                                            )} (${value}%)`}
                                        </Typography>
                                    </Tooltip>
                                    <LinearProgress
                                        variant="determinate"
                                        value={value}
                                        color={color}
                                        sx={{
                                            width: { xs: "100%", md: "70%" },
                                            height: "1rem",
                                            borderRadius: "0.6rem",
                                        }}
                                        valueBuffer={100}
                                    />
                                </Stack>
                            );
                        }
                        return null;
                    })}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default ProgressWithPercentage;
