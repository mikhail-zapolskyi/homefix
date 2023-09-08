import { Avatar, Typography, Grid } from "@mui/material";
import { CustomDashboardCard } from "@/components";
import { ServiceProfile, User } from "@prisma/client";
import { useEffect, useState } from "react";
import AddReviewModal from "./AddReviewModal";

interface Props {
    business: ServiceProfile | null;
}
const DetailsCard = ({ business }: Props) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/users/${business?.userId}`,
                    {
                        method: "GET",
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                    return;
                }
                return console.log("user not found");
            } catch (error) {
                console.error("An error occurred", error);
            }
        };
        getUser();
    }, [business?.userId]);

    if (!business) {
        return <div>Select a business to view details.</div>;
    }

    return (
        <CustomDashboardCard>
            {business && (
                <Grid container rowSpacing={3}>
                    <Grid
                        container
                        item
                        xs={12}
                        sx={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "start",
                        }}
                        columnSpacing={2}
                    >
                        <Grid item>
                            <Avatar
                                src={`${user?.image}`}
                                alt={`${user?.name}`}
                                sx={{ width: 55, height: 55 }}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Grid item xs={12}>
                                <Typography variant="body1">
                                    {user?.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    {user?.email}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <AddReviewModal
                                proId={business?.userId}
                                serviceId={business?.id}
                                name={business?.name}
                                desc={business?.introduction}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">
                            Name: {business.name}
                        </Typography>
                        <Typography variant="body2">
                            Description: {business.introduction}
                        </Typography>
                        <Typography variant="body2">
                            Bio: {business.bio}
                        </Typography>
                        <Typography variant="body2">
                            Rating: {business.rating} stars
                        </Typography>
                        <Typography variant="body2">
                            Experiance: {business.experience} years
                        </Typography>
                    </Grid>
                </Grid>
            )}
        </CustomDashboardCard>
    );
};

export default DetailsCard;
