import {
    Divider,
    LinearProgress,
    Rating,
    Stack,
    Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Review } from "@prisma/client";

interface ProgressWithPercentageProps {
    number: number;
    array: Review[]; // Update the array type to Review[]
}

const ProgressWithPercentage: React.FC<ProgressWithPercentageProps> = ({
    number,
    array,
}) => {
    const [stars, setStars] = useState<{ [key: number]: number }>({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    });

    const getPercentageFromArray = useCallback((arr: Review[]) => {
        if (arr.length > 0) {
            const newStars: { [key: number]: number } = { ...stars };

            arr.forEach((obj) => {
                const { rating } = obj;
                if (rating !== null && !isNaN(rating)) {
                    if (rating >= 5) {
                        newStars[5] += 1;
                    } else if (rating === 4) {
                        newStars[4] += 1;
                    } else if (rating === 3) {
                        newStars[3] += 1;
                    } else if (rating === 2) {
                        newStars[2] += 1;
                    } else if (rating === 1) {
                        newStars[1] += 1;
                    }
                }
            });

            const totalRatings = arr.length;
            for (let i = 1; i <= 5; i++) {
                newStars[i] = (newStars[i] / totalRatings) * 100;
            }

            setStars(newStars);
        }
    }, []);

    useEffect(() => {
        getPercentageFromArray(array);
    }, [array, getPercentageFromArray]);

    return (
        <Stack direction="column" spacing={1}>
            <Stack
                direction="row"
                spacing={3}
                divider={<Divider orientation="vertical" flexItem />}
            >
                <Stack spacing={1}>
                    <Typography variant="body1">
                        {number !== 0 ? number : "Not rated"}
                    </Typography>
                    <Rating
                        name="text-feedback"
                        value={number}
                        readOnly
                        precision={0.1}
                        size="large"
                        emptyIcon={
                            <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                            />
                        }
                    />
                    <Typography variant="body1">
                        {array.length !== 0
                            ? `${array.length} reviews`
                            : "Not reviewed"}
                    </Typography>
                </Stack>
                <Stack direction="column">
                    {Array.from({ length: 5 }, (_, index) => (
                        <Stack
                            key={index}
                            direction="row"
                            alignItems="center"
                            spacing={1}
                        >
                            <Typography>{5 - index}</Typography>
                            <StarBorderIcon fontSize="small" />
                            <LinearProgress
                                variant="determinate"
                                value={stars[5 - index]}
                                color="primary"
                                sx={{
                                    width: "5rem",
                                }}
                            />
                            <Typography variant="body2">
                                {stars[5 - index].toFixed()}%
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Stack>
    );
};

export default ProgressWithPercentage;
