"use client";

import { ListCard, ReviewCard, SearchBar } from "@/components";
import { Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

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
    return (
        <>
            <Card sx={{ margin: "2rem", height: "5rem" }}>
                <CardContent>
                    <SearchBar title="Find a Review" />
                </CardContent>
            </Card>
            <Grid container spacing={2}>
                <Grid xs={12} md={3}>
                    <ListCard data={data} />
                </Grid>
                <Grid xs={12} md={9}>
                    <ReviewCard />
                </Grid>
            </Grid>
        </>
    );
};

export default UserReviews;
