"use client";

import { LocationCard, ProfileCard } from "@/components";
import { filterEmptyValues } from "@/utils/helpers/filterEmptyValues";
import { Grid } from "@mui/material";
import { User } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface UserProfileProps {
    data?: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ data }) => {
    const [formData, setFormData] = useState<User>();

    useEffect(() => {
        setFormData(data);
    }, [data]);

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
                <Grid item xs={12}>
                    <LocationCard />
                </Grid>
            </Grid>
        )
    );
};

export default UserProfile;
