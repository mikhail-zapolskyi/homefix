"use client";
import { Container, Grid, Paper, Box, Typography, Divider, Button } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiStar } from "react-icons/bi";
import Image from 'next/image'
import { SlEmotsmile } from "react-icons/sl";
import { PrimaryButton } from "@/components";
import { ViewProfileButton } from "@/components/button/PrimaryButton";
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

    // Should lead to fixer profile
    const handleViewProfile = () => {
        return 
    }

    return (
        <Container sx={{pb: '10rem'}}>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={10} md={8} >
                    {services.map((service) => (
                        <Grid container key={service.id} sx={{
                            mt: '3rem',
                            borderRadius: '1rem',
                            border: 1,
                            borderColor: 'secondary.dark',
                            display: 'flex',
                            flexDirection: 'row',
                            height: '20rem'
                        }}>
                            <Image loader={myLoader} alt="thumbnail" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRcxxGDQ0zFHRGv6IDse2hxCdhZrrrm7RIzg&usqp=CAU"} width={200} height={200} style={{ borderRadius: '50px' }} />
                            <Grid item xs={2} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                ml: '3rem'
                            }}>

                                <Typography variant="h4" sx={{
                                    mb: '0.1rem',
                                    mt: '1rem',
                                    color: 'primary.main',
                                    fontWeight: 'bold'
                                }}>
                                    {service.name}
                                </Typography>

                                <Typography sx={{
                                    mb: '1rem',
                                    fontWeight: 'bold'
                                }}>
                                    {service.city}
                                </Typography>

                                <Typography variant="h6"
                                    sx={{
                                        fontWeight: '500'
                                }}>
                                    {service.rating}
                                    <BiStar style={{ fontSize: 18 }} />
                                </Typography>
                                <Typography variant="subtitle1"
                                    sx={{fontWeight: 'bold'}}
                                >
                                    Skill Level: 
                                </Typography>

                                <Box sx={{
                                    mb: '1rem',
                                    pt: '1rem'
                                    }}>
                                    <Typography>
                                        Description for each
                                    </Typography>
                                </Box>

                            </Grid>
                            <Grid item xs={1} sx={{ml: '8rem'}}>
                                <Divider orientation="vertical" sx={{ height: '100%'}}/>
                            </Grid>
                            <Grid item xs={2} 
                                sx={{
                                    mt: {xs: '1rem', md: '1.5rem', lg: '2rem'},
                                    ml: {xs: '0.5rem', md: '1rem', lg: '1.5rem'}
                                }}>
                                {/* This is in place of the company logo */}
                                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                    <SlEmotsmile style={{fontSize: '30', margin: '1rem'}}/>
                                    <Typography>About the fixer profile description</Typography>
                                </Box>
                                <ViewProfileButton text="View Profile" onClick={handleViewProfile} />
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
};

export default ViewServices;
