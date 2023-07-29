"use client";
import {
    DetailsCard,
    ProfileCard,
    ListCard,
    ReviewCard,
    SearchBar,
    SlideMenu,
} from "@/components";
import { Box, Card, CardContent, Container, Grid } from "@mui/material";
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
        <Grid
            container
            xs={12}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={0}
            gap={"1rem"}
        >
            <Grid item xs={12}>
                <Card
                    sx={{
                        height: "5rem",
                        borderRadius: "1rem",
                    }}
                    elevation={4}
                >
                    <CardContent>
                        <SearchBar title="Find a Review" />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={3}>
                <ListCard data={data} />
            </Grid>
            <Grid item xs={12} md={7}>
                <ReviewCard />
            </Grid>
        </Grid>
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
            <Box
                sx={{
                    xs: { p: "0" },
                    sm: { p: "1rem" },
                    md: { p: "5rem" },

                    width: "98%",
                    mx: "auto",
                }}
            >
                {components[selectedComponent]}
            </Box>
        </>
    );
};

export default ServiceAccountDashboard;
