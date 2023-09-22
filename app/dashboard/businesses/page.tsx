"use client";

import { DetailsCard, ListCard } from "@/components";
import { Grid } from "@mui/material";
import { Customer, ServiceProfile, User } from "@prisma/client";
import { useEffect, useState } from "react";

interface Business extends Customer {
    user: User;
    service: ServiceProfile;
}

const Businesses = async () => {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [service, setService] = useState<ServiceProfile | null>(null);

    const getBusinesses = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/users/businesses",
                {
                    method: "GET",
                }
            );

            if (response.ok) {
                const data = (await response.json()) as Business[];
                setBusinesses(data);
                return;
            }
            return console.log("user not found");
        } catch (error) {
            console.error("An error occurred", error);
        }
    };

    const handleClick = (business: ServiceProfile) => {
        setService(business);
    };

    useEffect(() => {
        getBusinesses();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
                <ListCard data={businesses} handleClick={handleClick} />
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
                <DetailsCard business={service || businesses[0]?.service} />
            </Grid>
        </Grid>
    );
};

export default Businesses;
