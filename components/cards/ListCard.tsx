import { Grid, Avatar, Card, CardContent, Typography } from "@mui/material";
import { CustomDashboardCard } from "@/components";

const ListCard = ({ data }: { data: Array<{}> }) => {
    return (
        <CustomDashboardCard>
            <Grid container xs={12} spacing={1}>
                {data.map((item: any) => (
                    <Grid
                        container
                        item
                        xs={12}
                        key={item.id}
                        sx={{ alignItems: "center", justifyContent: "center" }}
                    >
                        <Grid item xs={4} sm={4} md={4} lg={2}>
                            <Avatar
                                src={`${item?.image}`}
                                alt={`${item?.name}`}
                                sx={{ width: 55, height: 55 }}
                            />
                        </Grid>
                        <Grid container item xs={8} sm={8} md={8} lg={10}>
                            <Grid item xs={12}>
                                <Typography variant="body1">
                                    {item.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    {item.email}
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
