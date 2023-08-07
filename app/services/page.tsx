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
    fixerImage: string;
    fixerDescription: string;
    serviceDescription: string;
}


const initialServiceProfiles = [
    {
        id: '1',
        name: 'Service 1',
        city: 'Calgary',
        rating: 5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRcxxGDQ0zFHRGv6IDse2hxCdhZrrrm7RIzg&usqp=CAU",
        skill: 2,
        fixerImage: '',
        fixerDescription: 'Marcus Applewood - Plumber',
        serviceDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at augue id libero sagittis lobortis ac sit amet velit. Integer neque tellus, rhoncus a nulla nec, porttitor convallis risus. Etiam et neque augue. Sed erat purus, dictum vel elit a, congue varius libero. Integer lobortis mattis tellus eu venenatis.'

    },
    {
        id: '2',
        name: 'Service 2',
        city: 'Edmonton',
        rating: 4,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRcxxGDQ0zFHRGv6IDse2hxCdhZrrrm7RIzg&usqp=CAU",
        skill: 3,
        fixerImage: '',
        fixerDescription: 'Jason Manson - Handyman',
        serviceDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at augue id libero sagittis lobortis ac sit amet velit. Integer neque tellus, rhoncus a nulla nec, porttitor convallis risus. Etiam et neque augue. Sed erat purus, dictum vel elit a, congue varius libero. Integer lobortis mattis tellus eu venenatis.'
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
                    <Grid item key={service.id} sx={{mt: '2rem', width: '100%'}}>
                        <SearchResultServiceProfileCard
                            onClick={handleViewProfile}
                            id={service.id}
                            name={service.name}
                            city={service.city}
                            rating={service.rating}
                            image={service.image}
                            skill={service.skill}
                            fixerImage={service.fixerImage}
                            fixerDescription={service.fixerDescription}
                            serviceDescription={service.serviceDescription}
                        />
                    </Grid>

                ))}
            </Grid>
        </Container>
    );
};

export default ViewServices;
