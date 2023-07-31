import { Avatar, CardContent, Typography, Grid, Box } from "@mui/material";
import { CustomDashboardCard } from "@/components";

const DetailsCard = () => {
    return (
        <CustomDashboardCard>
            <Grid container xs={12} rowSpacing={3}>
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
                            src={`${"image"}`}
                            alt={`${"name"}`}
                            sx={{ width: 55, height: 55 }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Grid item xs={12}>
                            <Typography variant="body1">{"name"}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2">{"email"}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">Service id</Typography>
                    <Typography variant="body2">Service category</Typography>
                    <Typography variant="body2">Service name</Typography>
                    <Typography variant="body2">Service description</Typography>
                    <Typography variant="body2">Service price</Typography>
                </Grid>
            </Grid>
        </CustomDashboardCard>
    );
};

export default DetailsCard;
