import { Grid, Avatar, Typography } from "@mui/material";
import { CustomDashboardCard } from "@/components";
import { Customer, ServiceProfile, User } from "@prisma/client";

interface Business extends Customer {
    user: User;
    service: ServiceProfile;
}
interface Props {
    data: Business[];
    handleClick: (business: ServiceProfile) => void;
}

const ListCard = ({ data, handleClick }: Props) => {
    return (
        <CustomDashboardCard>
            <Grid container rowSpacing={3}>
                {data &&
                    data.map((item: Business) => (
                        <Grid
                            container
                            item
                            xs={12}
                            key={item.id}
                            sx={{
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "start",
                            }}
                            columnSpacing={2}
                            onClick={() => handleClick(item.service)}
                        >
                            <Grid item>
                                <Avatar
                                    src={`${item?.service.image}`}
                                    alt={`${item?.service.name}`}
                                    sx={{ width: 55, height: 55 }}
                                />
                            </Grid>
                            <Grid container item xs={8}>
                                <Grid item xs={12}>
                                    <Typography variant="body1">
                                        {item.service.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        {item.service.email}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
            </Grid>
        </CustomDashboardCard>
    );
};

export default ListCard;
