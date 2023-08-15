"use client";

import {
    CustomDashboardCard,
    ListCard,
    ReviewCard,
    SearchBar,
} from "@/components";
import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

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
    const { data: session, status } = useSession();

    useEffect(() => {
        if (!session && status === "unauthenticated") {
            toast.error("Please log in first");
            throw new Error("You don't have permissions to access this page");
        }
    }, [session, status]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <CustomDashboardCard>
                    <SearchBar title="Find a Review" />
                </CustomDashboardCard>
            </Grid>
            <Grid item container xs={12} spacing={2}>
                <Grid item xs={12} md={4}>
                    <ListCard data={data} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <ReviewCard />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UserReviews;
