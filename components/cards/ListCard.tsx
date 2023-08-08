import { Grid, Avatar, Card, CardContent, Typography } from "@mui/material";
import { CustomDashboardCard } from "@/components";

const ListCard = ({ data }: { data: Array<{}> }) => {
    return (
        <CustomDashboardCard>
            <Grid container rowSpacing={3}>
                {data.map((item: any) => (
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
                    >
                        <Grid item>
                            <Avatar
                                src={`${item?.image}`}
                                alt={`${item?.name}`}
                                sx={{ width: 55, height: 55 }}
                            />
                        </Grid>
                        <Grid container item xs={8}>
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
