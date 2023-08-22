"use client";

import { DetailsCard, ListCard } from "@/components";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

const Businesses = async () => {
    const [businesses, setBusinesses] = useState([]);
    const [service, setService] = useState(null);

    const getBusinesses = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/users/businesses",
                {
                    method: "GET",
                }
            );

            if (response.ok) {
                const data = await response.json();
                setBusinesses(data);
                return;
            }
            return console.log("user not found");
        } catch (error) {
            console.error("An error occurred", error);
        }
    };

    const handleClick = (business: any) => {
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
                <DetailsCard business={service} />
            </Grid>
        </Grid>
    );
};

export default Businesses;
