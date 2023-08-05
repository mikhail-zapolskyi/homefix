"use client";
import { Container, Grid, Paper, Box, Typography, Divider } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiStar } from "react-icons/bi";
import Image from 'next/image'

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

    const myLoader = () => {
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRcxxGDQ0zFHRGv6IDse2hxCdhZrrrm7RIzg&usqp=CAU"
    }
    return (
        <Container >
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={10}>
                    {services.map((service) => (
                        <Paper key={service.id} sx={{ mt: '3rem', borderRadius: '1rem', border: 1, borderColor: 'secondary.dark', display: 'flex', flexDirection: 'row' }}>
                            <Image loader={myLoader} alt="thumbnail" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRcxxGDQ0zFHRGv6IDse2hxCdhZrrrm7RIzg&usqp=CAU"} width={200} height={200} style={{ borderRadius: '50px' }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', ml: '3rem'}}>
                                <Typography variant="h4" sx={{ mb: '0.1rem', mt: '1rem', color: 'primary.main' }}>{service.name}</Typography>
                                <Typography sx={{ mb: '1rem' }}>{service.city}</Typography>
                                <Typography variant="h6" sx={{ fontWeight: '500' }}>{service.rating}<BiStar style={{ fontSize: 18 }} /></Typography>
                                <Box sx={{ mb: '1rem', pt: '1rem' }}>
                                    <Typography>Description for each </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ml: '10rem', height: 'auto'}}>
                                <Divider orientation="vertical" sx={{ height: '13rem'}}/>
                            </Box>
                        </Paper>
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
};

export default ViewServices;
