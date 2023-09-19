"use client";
import { CustomButton } from "@/components";
import { Container, Grid, Paper } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRouter } from "next/navigation";

interface Services {
    id: string;
    address: string | null;
    city: string | null;
    country: string | null;
    lat: string | null;
    lng: string | null;
    serviceProfileId?: string;
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

    console.log(serviceData);

    return (
        <Container>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={10}>
                    {serviceData &&
                        serviceData.map((i) => (
                            <Paper key={i?.id}>
                                <p>{i?.service?.name}</p>
                                <p>{i?.city}</p>
                                <p>{i?.service?.rating}</p>
                                <CustomButton
                                    text="Add to Businesses"
                                    onClick={() =>
                                        addToBusinesses(i?.serviceProfileId)
                                    }
                                    endIcon={<FavoriteBorderIcon />}
                                />
                                <CustomButton
                                    text="View Profile"
                                    onClick={() =>
                                        router.push(
                                            `/services/${i.serviceProfileId}`
                                        )
                                    }
                                />
                            </Paper>
                        ))}
                </Grid>
            </Grid>
        </Container>
    );
};

export default ViewServices;
