"use client";
import { Container, Grid, Paper, Box, Typography, Divider, Button, Avatar } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiStar } from "react-icons/bi";
import Image from 'next/image'
import { SlEmotsmile } from "react-icons/sl";
import { PrimaryButton } from "@/components";
import { SearchResultServiceProfileCard } from "@/components";

interface Services {
    id: string;
    name: string;
    city: string;
    rating: number;
    image: string;
    skill: number;
}


const initialServiceProfiles = [
    {
        id: '1',
        name: 'Service 1',
        city: 'Calgary',
        rating: 5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRcxxGDQ0zFHRGv6IDse2hxCdhZrrrm7RIzg&usqp=CAU",
        skill: 2

    },
    {
        id: '2',
        name: 'Service 2',
        city: 'Edmonton',
        rating: 4,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRcxxGDQ0zFHRGv6IDse2hxCdhZrrrm7RIzg&usqp=CAU",
        skill: 3

    },
]

export const ViewServices = () => {
    const searchParams = useSearchParams().toString();
    const [services, setServices] = useState<Services[]>(initialServiceProfiles);


    // Should lead to fixer profile
    const handleViewProfile = () => {
        
    }
    



    return (
        <Container sx={{pb: '10rem'}}>
            <Grid container spacing={2}>
                {services.map((service) => (
                    <Grid item key={service.id}>
                        <SearchResultServiceProfileCard
                            onClick={handleViewProfile}
                            id={service.id}
                            name={service.name}
                            city={service.city}
                            rating={service.rating}
                            image={service.image}
                            skill={service.skill}
                        />
                    </Grid>

                ))}
            </Grid>
        </Container>
    );
};

export default ViewServices;
