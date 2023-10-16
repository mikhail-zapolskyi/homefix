"use client";

import { ViewEditLocation, ViewEditUserProfile } from "@/components";
import { filterEmptyValues } from "@/utils/helpers/filterEmptyValues";
import { Grid } from "@mui/material";
import { User, Location } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";

interface Props {
    userProfile?: User;
    location?: Location;
    mutate: KeyedMutator<any>;
}

const ViewDashUserPro: React.FC<Props> = ({
    userProfile,
    location,
    mutate,
}) => {
    const [userProfileFormData, setUserProfileFormData] = useState<User>();
    const [locationFormData, setLocationFormData] = useState<Location>();
    const { data: session, update } = useSession();

    useEffect(() => {
        if (userProfile) setUserProfileFormData(userProfile);
    }, [userProfile]);

    useEffect(() => {
        if (location) setLocationFormData(location);
    }, [location]);

    const handleSave = async (data: Record<string, any>) => {
        const notEmptyData = filterEmptyValues(data);

        try {
            const response = await axios.put("/api/users", notEmptyData);

            if (response.status === 200) {
                mutate();
                toast.success("Changes Saved");
                updateSession({
                    name: response.data.name,
                    image: response.data.image,
                    type: response.data.type,
                });
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.message);
            }
        }
    };

    const handleSaveProfileImage = async (file: File) => {
        if (!file) {
            return toast.error("Something went wrong");
        }

        const data = new FormData();
        data.append("file", file);

        try {
            const response = await axios.put("/api/users/image-upload", data);

            if (response.status === 200) {
                mutate();
                toast.success("Changes Saved");
                updateSession({
                    name: response.data.name,
                    image: response.data.image,
                    type: response.data.type,
                });
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.message);
            }
        }
    };

    const handleDeleteData = async (data: Record<string, any>) => {
        try {
            const response = await axios.put("/api/users", data);

            if (response.status === 200) {
                mutate();
                toast.success("Item Delete Successfully");
                updateSession({
                    name: response.data.name,
                    image: response.data.image,
                    type: response.data.type,
                });
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.message);
            }
        }
    };

    const handleLocationSave = async (data: Record<string, any>) => {
        const notEmptyData = filterEmptyValues(data);
        try {
            const response = await axios.put("/api/location", notEmptyData);

            if (response.status === 200) {
                mutate();
                toast.success("Changes Saved");
                updateSession({
                    name: response.data.name,
                    image: response.data.image,
                    type: response.data.type,
                });
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.message);
            }
        }
    };

    const updateSession = (user: Record<string, any>) => {
        update({
            ...session,
            user,
        });
    };

    return (
        userProfileFormData && (
            <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                    <ViewEditUserProfile
                        data={{
                            name: userProfileFormData.name,
                            email: userProfileFormData.email,
                            password: "",
                            image: userProfileFormData.image,
                            phone: userProfileFormData.phone,
                        }}
                        updateCallback={handleSave}
                        deleteCallback={handleDeleteData}
                        imageUploadCallback={handleSaveProfileImage}
                    />
                </Grid>
                {
                    <Grid item xs={12}>
                        <ViewEditLocation
                            title="Personal Address"
                            data={{
                                address:
                                    locationFormData &&
                                    locationFormData.address,
                                city: locationFormData && locationFormData.city,
                                state:
                                    locationFormData && locationFormData.state,
                                country:
                                    locationFormData &&
                                    locationFormData.country,
                                postalCode:
                                    locationFormData &&
                                    locationFormData.postalCode,
                            }}
                            updateCallback={handleLocationSave}
                        />
                    </Grid>
                }
            </Grid>
        )
    );
};

export default ViewDashUserPro;
