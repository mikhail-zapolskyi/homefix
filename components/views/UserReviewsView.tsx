"use client";

import { Grid } from "@mui/material";
import { Review, ServiceProfile, User } from "@prisma/client";
import { useEffect, useState } from "react";
import CustomDashboardCard from "../cards/CustomDashboardCard";
import SearchBar from "../inputs/SearchBar";
import ReviewListCard from "../cards/ReviewListCard";
import ReviewCard from "../cards/ReviewCard";

interface Ireview extends Review {
    user: User;
    service: ServiceProfile;
}

const UserReviewsView = () => {
    const [reviews, setReviews] = useState<Ireview[]>([]);
    const [review, setReview] = useState<Ireview | null>(null);

    const getReviews = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/users/reviews",
                {
                    method: "GET",
                }
            );

            if (response.ok) {
                const data = (await response.json()) as Ireview[];
                setReviews(data);
                return;
            }
            return console.log("user not found");
        } catch (error) {
            console.error("An error occurred", error);
        }
    };

    const handleClick = (review: Ireview) => {
        setReview(review);
    };

    useEffect(() => {
        getReviews();
    }, []);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <CustomDashboardCard>
                    <SearchBar title="Find a Review" />
                </CustomDashboardCard>
            </Grid>
            <Grid item container xs={12} spacing={2}>
                <Grid item xs={12} md={4}>
                    <ReviewListCard data={reviews} handleClick={handleClick} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <ReviewCard review={review || reviews[0]} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UserReviewsView;
