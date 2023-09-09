"use client";

import { ViewEditLocation, ViewEditUserProfile } from "@/components";
import { filterEmptyValues } from "@/utils/helpers/filterEmptyValues";
import { Grid } from "@mui/material";
import { User, Location } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ViewUserProfileProps {
    userProfile?: User;
    location?: Location;
}

const ViewUserProfile: React.FC<ViewUserProfileProps> = ({
    userProfile,
    location,
}) => {
    const [userProfileFormData, setUserProfileFormData] = useState<User>();
    const [locationFormData, setLocationFormData] = useState<Location>();

    useEffect(() => {
        if (userProfile) setUserProfileFormData(userProfile);
    }, [userProfile]);

    useEffect(() => {
        if (location) setLocationFormData(location);
    }, [location]);

    const handleSave = async (data: Record<string, any>) => {
        const notEmptyData = filterEmptyValues(data);

        try {
            toast.promise(axios.put("/api/users", notEmptyData), {
                success: {
                    render({ data }) {
                        if (data) {
                            setUserProfileFormData(data.data);
                        }
                        return "Changes Saved";
                    },
                },
                error: "Something went wrong",
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const handleDelete = async (data: Record<string, any>) => {
        try {
            toast.promise(axios.put("/api/users", data), {
                success: {
                    render({ data }) {
                        if (data) {
                            setUserProfileFormData(data.data);
                        }
                        return "Changes Saved";
                    },
                },
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
                success: {
                    render({ data }) {
                        if (data) setLocationFormData(data.data);
                        return "Changes Saved";
                    },
                },
                error: "Something went wrong",
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
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
                        deleteCallback={handleDelete}
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

export default ViewUserProfile;
