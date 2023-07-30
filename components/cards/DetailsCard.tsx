import { Avatar, CardContent, Typography, Grid } from "@mui/material";
import { CustomDashboardCard } from "@/components";

const DetailsCard = () => {
    return (
        <CustomDashboardCard>
            <Grid
                container
                xs={12}
                sx={{ alignItems: "center", justifyContent: "center" }}
            >
                <Grid item xs={4} md={2} lg={1}>
                    <Avatar
                        src={`${"image"}`}
                        alt={`${"name"}`}
                        sx={{ width: 55, height: 55 }}
                    />
                </Grid>
                <Grid item xs={8} md={10} lg={11}>
                    <Typography variant="body1">{"name"}</Typography>
                    <Typography variant="body2">{"email"}</Typography>
                </Grid>
            </Grid>

            <Grid container xs={12} marginTop={2}>
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
