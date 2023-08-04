"use client";
import { Container, Grid, Paper } from "@mui/material";
import Typography from '@mui/material/Typography';

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Services {
    id: string;
    name: string;
    city: string;
    rating: number;
}

export const ViewServices = () => {
    const searchParams = useSearchParams().toString();
    const [services, setServices] = useState<Services[]>([]);

    useEffect(() => {
        getServicesBySearchParams();
    }, []);

    const getServicesBySearchParams = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/service?${searchParams}`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={10}>
                    {services.map((service) => (
                        <Paper key={service.id}>
                            <Typography>{service.name}</Typography>
                            <Typography>{service.city}</Typography>
                            <Typography>{service.rating}</Typography>
                        </Paper>
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
};

export default ViewServices;
