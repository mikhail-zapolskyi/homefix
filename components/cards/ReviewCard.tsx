"use client";
import { ChangeEvent, useState } from "react";
import {
    Avatar,
    Button,
    TextField,
    Typography,
    Grid,
    SelectChangeEvent,
} from "@mui/material";
import { CustomDashboardCard } from "@/components";
import MessageIcon from "@mui/icons-material/Message";
import { SelectField } from "@/components";
import { Review, ServiceProfile, User } from "@prisma/client";

interface Ireview extends Review {
    user: User;
    service: ServiceProfile;
}

interface Props {
    review: Ireview | null;
}

const ReviewCard = ({ review }: Props) => {
    const [rating, setRating] = useState(review?.rating);
    const [currentReview, setCurrentReview] = useState(review?.comment);

    const handleSelectOnChange = (e: SelectChangeEvent<unknown>) => {
        const value = Number(e.target.value);
        setRating(value);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentReview(e.target.value);
    };

    const handleClick = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/reviews/${review?.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        comment: currentReview,
                        rating,
                    }),
                }
            );

            if (response.ok) {
                return;
            }
            return console.log("user not found");
        } catch (error) {
            console.error("An error occurred", error);
        }
    };
    console.log(rating, currentReview);

    return (
        <CustomDashboardCard>
            <Grid container rowSpacing={4}>
                <Grid container item xs={12} rowSpacing={2}>
                    <Grid
                        item
                        container
                        xs={12}
                        sm={6}
                        sx={{ alignItems: "center", justifyContent: "start" }}
                    >
                        <Grid item>
                            <Avatar
                                src={`${"image"}`}
                                alt={`${"name"}`}
                                sx={{
                                    width: 55,
                                    height: 55,
                                    marginRight: "1rem",
                                }}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body1">{"name"}</Typography>
                            <Typography variant="body2">{"email"}</Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        sm={6}
                        sx={{
                            alignItems: "start",
                            justifyContent: {
                                xs: "space-around",
                                md: "center",
                            },
                        }}
                    >
                        <Grid item>
                            <SelectField
                                id="rating"
                                name="rating"
                                emptyValue="Select Rating"
                                value={rating || ""}
                                array={[1, 2, 3, 4, 5]}
                                fieldState={false}
                                onChange={handleSelectOnChange}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                endIcon={<MessageIcon />}
                            >
                                Message
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Review"
                        multiline
                        rows={4}
                        defaultValue={review?.comment}
                        sx={{ width: "100%" }}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item container justifyContent={"end"}>
                    <Button variant="outlined" onClick={handleClick}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </CustomDashboardCard>
    );
};

export default ReviewCard;
