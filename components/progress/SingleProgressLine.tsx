import useDefineColorByRating from "@/hooks/useDefineColorByRating";
import { LinearProgress, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Star } from "lucide-react";
import React, { FC } from "react";

type Props = {
    title: string;
    value: number | null;
};

const SingleProgressLine: FC<Props> = ({ ...props }) => {
    const theme = useTheme();
    const color = useDefineColorByRating({ number: props.value });

    return (
        <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2">{props.title}</Typography>
            </Stack>
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ width: "70%" }}
            >
                <LinearProgress
                    variant="determinate"
                    value={props.value || 0}
                    color={color}
                    sx={{
                        width: "100%",
                        height: "0.6rem",
                        borderRadius: "0.6rem",
                    }}
                    valueBuffer={100}
                />
                <Star color={`${theme.palette.info.main}`} fontSize="small" />
                <Typography variant="body2">{props.value}%</Typography>
            </Stack>
        </Stack>
    );
};

export default SingleProgressLine;
