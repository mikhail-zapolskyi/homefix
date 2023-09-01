"use client";

import {
    CustomDashboardCard,
    ListCard,
    ReviewCard,
    ReviewListCard,
    SearchBar,
} from "@/components";
import { Grid } from "@mui/material";
import { Review, ServiceProfile, User } from "@prisma/client";
import { useEffect, useState } from "react";

interface Ireview extends Review {
    user: User;
    service: ServiceProfile;
}

const data = [
    {
        id: 1,
        name: "Moneer",
        email: "moneer@email.com",
        image: "image",
    },
    {
        id: 2,
        name: "Mykhailo",
        email: "mykhailo.email.com",
        image: "image",
    },
    {
        id: 3,
        name: "Sava",
        email: "sava@email.com",
        image: "image",
    },
];

const UserReviews = () => {
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
                    <ReviewCard review={review} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UserReviews;
