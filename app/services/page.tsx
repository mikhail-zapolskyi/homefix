"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Services {
    id: string;
    name: string;
    city: string;
}

export const Services = () => {
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
    console.log(services);
    return (
        <div>
            {services.map((service) => (
                <p key={service.id}>{service.name}</p>
            ))}
        </div>
    );
};

export default Services;
