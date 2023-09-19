"use client";
import { Container, Divider, Grid, Paper } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PageContainer, ViewServiceProfile } from "@/components";
import ViewSearchServiceProfile from "@/components/cards/ViewServiceProfile";

interface Services {
    id: string;
    address?: string;
    city?: string;
    country?: string;
    lat?: string;
    lng?: string;
    service: {
        bgChecked?: boolean;
        fixerName?: string;
        bio?: string;
        employees?: number;
        experience?: number;
        hiredTimes?: number;
        image?: string;
        introduction?: string;
        name?: string;
        paymentMethods?: string[];
        phone?: string;
        rating?: number;
        specialtiesDo?: string[];
        specialtiesNo?: string[];
    };
}

const searchedServiceProfile = [{

    id: '1',
    name: 'Johnothan Doe',
    service: {
        bgChecked: true,
        employees: 1,
        experience: 19,
        hiredTimes: 2,
        image: 'https://images.unsplash.com/photo-1687360441205-807780a8e5db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
        introduction: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae diam justo. Donec sed rhoncus dolor. Ut lobortis tristique sagittis. Morbi vitae tortor sapien. Curabitu',
        name: 'Service Name',
        paymentMethods: ['cash app', 'visa', 'crypto'],
        phone: '122-123-1233',
        rating: 3.6,
        specialtiesDo: ['apple ipsum', 'orange lorem ipsum sit', 'lorem ipsum dolor sit amet', 'value 1', '2nd value'],
        specialtiesNo: ['tomato lorem', 'potato ipsum dolor'],
    }
},
{

    id: '2',
    name: 'Beverly Robert',
    service: {
        bgChecked: true,
        employees: 1,
        experience: 8,
        hiredTimes: 2,
        image: 'https://images.unsplash.com/photo-1687360441205-807780a8e5db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60',
        introduction: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae diam justo. Donec sed rhoncus dolor. Ut lobortis tristique sagittis. Morbi vitae tortor sapien. Curabitu',
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

    // Should lead to fixer profile
    const handleViewProfile = () => {

    }

    console.log(searchedServiceProfile);

    return (
        <PageContainer maxWidth='xl'>
            <Grid container spacing={2} pt={2}>
                {searchedServiceProfile.map((serviceProfileData) => (
                    <Grid item xs={12} key={serviceProfileData.id} sx={{ py: '-4rem' }}>
                        <ViewSearchServiceProfile
                            onClick={handleViewProfile}
                            data={serviceProfileData}
                        />
                    </Grid>

                ))}
            </Grid>
        </PageContainer>
    );
};

export default ViewServices;








