"use client";

import { DetailsCard, ListCard } from "@/components";
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

const Businesses = () => {
    return (
        <Grid container spacing={2}>
            <Grid xs={12} md={3}>
                <ListCard data={data} />
            </Grid>
            <Grid xs={12} md={9}>
                <DetailsCard />
            </Grid>
        </Grid>
    );
};

export default Businesses;
