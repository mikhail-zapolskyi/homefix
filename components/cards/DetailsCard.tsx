import { Avatar, CardContent, Typography, Grid, Box } from "@mui/material";
import { CustomDashboardCard } from "@/components";

const DetailsCard = () => {
    return (
        <CustomDashboardCard>
            <Grid container xs={12}>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: "start",
                    }}
                >
                    <Avatar
                        src={`${"image"}`}
                        alt={`${"name"}`}
                        sx={{ width: 55, height: 55 }}
                    />
                    <Box>
                        <Typography variant="body1">{"name"}</Typography>
                        <Typography variant="body2">{"email"}</Typography>
                    </Box>
                </Box>
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
