import { Avatar, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const DetailsCard = () => {
    return (
        <Grid container margin={2}>
            <Grid xs={12}>
                <Card>
                    <CardContent>
                        <Grid>
                            <Grid container alignItems="center">
                                <Grid xs={3} sm={1}>
                                    <Avatar
                                        src={`${"image"}`}
                                        alt={`${"name"}`}
                                        sx={{ width: 55, height: 55 }}
                                    />
                                </Grid>
                                <Grid xs={8} sm={11}>
                                    <Typography variant="body1">
                                        {"name"}
                                    </Typography>
                                    <Typography variant="body2">
                                        {"email"}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container marginTop={2}>
                            <Grid xs={6}>
                                <Typography variant="body2">
                                    Service id
                                </Typography>
                                <Typography variant="body2">
                                    Service category
                                </Typography>
                                <Typography variant="body2">
                                    Service name
                                </Typography>
                                <Typography variant="body2">
                                    Service description
                                </Typography>
                                <Typography variant="body2">
                                    Service price
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default DetailsCard;
