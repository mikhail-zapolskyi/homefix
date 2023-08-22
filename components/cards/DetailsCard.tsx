import { Avatar, Typography, Grid, Box } from "@mui/material";
import { CustomDashboardCard } from "@/components";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

const DetailsCard = ({ business }: any) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/users/${business.service.userId}`,
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
    }, [business.service.userId]);

    if (!business) {
        return <div>Select a business to view details.</div>;
    }

    console.log(user);

    return (
        <CustomDashboardCard>
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
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                        Name: {business.service.name}
                    </Typography>
                    <Typography variant="body2">
                        Description: {business.service.introduction}
                    </Typography>
                    <Typography variant="body2">
                        Bio: {business.service.bio}
                    </Typography>
                    <Typography variant="body2">
                        Rating: {business.service.rating} stars
                    </Typography>
                    <Typography variant="body2">
                        Experiance: {business.service.experience} years
                    </Typography>
                </Grid>
            </Grid>
        </CustomDashboardCard>
    );
};

export default DetailsCard;
