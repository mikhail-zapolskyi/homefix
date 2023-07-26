"use client";
import {
    DetailsCard,
    ProfileCard,
    ListCard,
    ReviewCard,
    SearchBar,
} from "@/components";
import { Card, CardContent } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";

interface Components {
    profile: JSX.Element;
    reviews: JSX.Element;
    services: JSX.Element;
    [key: string]: JSX.Element;
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

const components: Components = {
    profile: <ProfileCard />,
    reviews: (
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
    ),
    services: (
        <Grid container spacing={2}>
            <Grid xs={12} md={3}>
                <ListCard data={data} />
            </Grid>
            <Grid xs={12} md={9}>
                <DetailsCard />
            </Grid>
        </Grid>
    ),
};

export const ServiceAccountDashboard = () => {
    const [selectedComponent, setSelectedComponent] = useState("profile");

    const handleMenuItemClick = (componentName: string) => {
        setSelectedComponent(componentName);
    };

    return (
        <>
            <div>
                <button onClick={() => handleMenuItemClick("profile")}>
                    profile
                </button>
                <button onClick={() => handleMenuItemClick("services")}>
                    services
                </button>
                <button onClick={() => handleMenuItemClick("reviews")}>
                    reviews
                </button>
            </div>
            <div>{components[selectedComponent]}</div>
        </>
    );
};

export default ServiceAccountDashboard;
