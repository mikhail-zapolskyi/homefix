"use client";

import {
    CustomDashboardCard,
    ListCard,
    ReviewCard,
    SearchBar,
} from "@/components";
import { Grid } from "@mui/material";

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
    const handleClick = () => {};
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <CustomDashboardCard>
                    <SearchBar title="Find a Review" />
                </CustomDashboardCard>
            </Grid>
            <Grid item container xs={12} spacing={2}>
                <Grid item xs={12} md={4}>
                    <ListCard handleClick={handleClick} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <ReviewCard />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UserReviews;
