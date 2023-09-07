"use client";
import { Container, Divider, Grid, Paper } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PageContainer, SearchResultServiceProfileCard } from "@/components";

interface Services {
    id: string;
    address?: string ;
    city?: string ;
    country?: string ;
    lat?: string ;
    lng?: string ;
    service: {
        bgChecked?: boolean;
        bio?: string;
        employees?: number;
        experience?: number;
        hiredTimes?: number;
        image?: string;
        introduction?: string ;
        name?: string ;
        paymentMethods?: string[];
        phone?: string ;
        rating?: number ;
        specialtiesDo?: string[];
        specialtiesNo?: string[];
    };
}

const initialData = [{

    id: '1',
    service: {
        bgChecked: true,
        bio: 'First Last',
        employees: 1,
        experience: 19,
        hiredTimes: 2,
        image: 'https://images.unsplash.com/photo-1687360441205-807780a8e5db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
        introduction: 'this is my introduction', 
        name: 'Service Name',
        paymentMethods: ['cash app', 'visa', 'crypto'],
        phone: '122-123-1233',
        rating: 3.6, 
        specialtiesDo: ['apple ipsum', 'orange lorem ipsum sit', 'lorem ipsum dolor sit amet'],
        specialtiesNo: ['tomato lorem', 'potato ipsum dolor'],
    }
},
{

    id: '2',
    service: {
        bgChecked: true,
        bio: 'First Last',
        employees: 1,
        experience: 8,
        hiredTimes: 2,
        image: 'https://images.unsplash.com/photo-1687360441205-807780a8e5db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
        introduction: 'this is my introduction', 
        name: 'Service Name',
        paymentMethods: ['cash app', 'visa', 'crypto'],
        phone: '122-123-1233',
        rating: 3.6, 
        specialtiesDo: ['apple ipsum', 'orange lorem ipsum sit', 'lorem ipsum dolor sit amet'],
        specialtiesNo: ['tomato lorem', 'potato ipsum dolor'],
    }
}
]
    


const ViewServices = () => {
    const searchParams = useSearchParams().toString();
    const [serviceData, setServiceData] = useState<Services[]>(initialData);

    // useEffect(() => {
    //     getServicesBySearchParams();
    // }, []);

    // const getServicesBySearchParams = async () => {
    //     try {
    //         const response = await fetch(
    //             `http://localhost:3000/api/service?${searchParams}`,
    //             {
    //                 method: "GET",
    //             }
    //         );
    //         const data = await response.json();
    //         setServiceData(data);
    //     } catch (error: any) {
    //         console.error(error);
    //         throw new Error(error.message);
    //     }
    // };

    // Should lead to fixer profile
    const handleViewProfile = () => {
    
    }

    console.log(serviceData);

    return (
        <PageContainer maxWidth='xl'>
            <Grid container spacing={2} pt={2}>
                {serviceData.map((i) => (
                    <Grid item xs={12} key={i.id} sx={{py: '-4rem'}}>
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
        </PageContainer>
    );
};

export default ViewServices;
