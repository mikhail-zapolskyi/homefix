"use client";
import { Container, Divider, Grid, Paper } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PageContainer } from "@/components";
import ViewSearchServiceProfile from "@/components/cards/ViewServiceProfile";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRouter } from "next/navigation";

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
    const [serviceData, setServiceData] = useState<Services[]>([]);
    const router = useRouter();


    useEffect(() => {
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
        getServicesBySearchParams();
    }, [searchParams]);

    console.log(serviceData);
    const addToBusinesses = async (serviceProfileId: any) => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/users/businesses",
                {
                    method: "POST",
                    body: JSON.stringify(serviceProfileId),
                }
            );
            const data = await response.json();
            console.log(data);
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    };

    

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








