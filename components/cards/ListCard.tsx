import { Avatar, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const ListCard = ({ data }: { data: Array<{}> }) => {
    return (
        <Grid container>
            <Grid xs={12}>
                <Card elevation={4} sx={{ borderRadius: "1rem" }}>
                    <CardContent>
                        {data.map((item: any) => (
                            <Grid key={item.id}>
                                <Grid
                                    container
                                    alignItems="center"
                                    rowSpacing={8}
                                >
                                    <Grid xs={3}>
                                        <Avatar
                                            src={`${item?.image}`}
                                            alt={`${item?.name}`}
                                            sx={{ width: 55, height: 55 }}
                                        />
                                    </Grid>
                                    <Grid xs={9}>
                                        <Typography variant="body1">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2">
                                            {item.email}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ListCard;
