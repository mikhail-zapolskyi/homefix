"use client";
import { Container, Grid, Paper } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SearchResultServiceProfileCard } from "@/components";

interface Services {
    id: string;
    address: string | null;
    city: string | null;
    country: string | null;
    lat: string | null;
    lng: string | null;
    service: {
        bgChecked: boolean;
        bio: string;
        employees: number | null;
        experience: null;
        hiredTimes: number | null;
        image: string | null;
        introduction: string | null;
        name: string | null;
        paymentMethods: string[];
        phone: string | null;
        rating: number | null;
        specialtiesDo: string[];
        specialtiesNo: string[];
    };
}

const ViewServices = () => {
    const searchParams = useSearchParams().toString();
    const [serviceData, setServiceData] = useState<Services[]>([]);

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
            setServiceData(data);
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    };

    // Should lead to fixer profile
    const handleViewProfile = () => {
    
    }

    console.log(serviceData);

    return (
        <Container sx={{pb: '10rem'}}>
            <Grid container spacing={2}>
                {serviceData.map((i) => (
                    <Grid item key={i.id} sx={{mt: '2rem', width: '100%'}}>
                        <SearchResultServiceProfileCard
                            onClick={handleViewProfile}
                            id={i.id}
                            name={i.service.name}
                            city={i.city}
                            rating={i.service.rating}
                            image={i.service.image}
                            experience={i.service.experience}
                            // should be i.service.fixerImage
                            fixerImage={i.service.image}
                            fixerDescription={i.service.bio}
                            serviceDescription={i.service.bio}
                        />
                    </Grid>

                ))}
            </Grid>
        </Container>
    );
};

export default ViewServices;
