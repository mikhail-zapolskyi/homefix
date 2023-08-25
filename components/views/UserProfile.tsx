"use client";

import { LocationCard, ProfileCard } from "@/components";
import { filterEmptyValues } from "@/utils/helpers/filterEmptyValues";
import { Grid } from "@mui/material";
import { User, Location } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface UserProfileProps {
    data?: User;
    location?: Location;
}

const UserProfile: React.FC<UserProfileProps> = ({ data, location }) => {
    const [formData, setFormData] = useState<User>();
    const [locationFormData, setLocationFormData] = useState<Location>();

    useEffect(() => {
        setFormData(data);
    }, [data]);

    useEffect(() => {
        setLocationFormData(location);
    }, [location]);

    const handleSave = async (data: Record<string, any>) => {
        const notEmptyData = filterEmptyValues(data);

        try {
            toast.promise(axios.put("/api/users", notEmptyData), {
                success: "Changes Saved",
                error: "Something went wrong",
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const handleLocationSave = async (data: Record<string, any>) => {
        const notEmptyData = filterEmptyValues(data);

        try {
            toast.promise(axios.put("/api/location", notEmptyData), {
                success: "Changes Saved",
                error: "Something went wrong",
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    return (
        formData && (
            <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                    <ProfileCard
                        data={{
                            name: formData.name,
                            email: formData.email,
                            password: "",
                            image: formData.image,
                            phone: formData.phone,
                        }}
                        handleCallback={handleSave}
                    />
                </Grid>
                {locationFormData && (
                    <Grid item xs={12}>
                        <LocationCard
                            title="Personal Address"
                            location={{
                                address: locationFormData.address,
                                city: locationFormData.city,
                                state: locationFormData.state,
                                country: locationFormData.country,
                                postalCode: locationFormData.postalCode,
                            }}
                            handleCallback={handleLocationSave}
                        />
                    </Grid>
                )}
            </Grid>
        )
    );
};

export default UserProfile;
