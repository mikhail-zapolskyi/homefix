import {
    Avatar,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Grid,
} from "@mui/material";

import MessageIcon from "@mui/icons-material/Message";
import DropDown from "../inputs/DropDown";

const ratings = ["1", "2", "3", "4", "5"];

const reviewText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.";

const ReviewCard = () => {
    return (
        <Grid container>
            <Grid xs={12}>
                <Card sx={{ borderRadius: "1rem" }} elevation={4}>
                    <CardContent>
                        <Grid>
                            <Grid
                                container
                                alignItems="center"
                                justifyContent={"space-between"}
                            >
                                <Grid container item xs={6}>
                                    <Grid xs={6} sm={3}>
                                        <Avatar
                                            src={`${"image"}`}
                                            alt={`${"name"}`}
                                            sx={{ width: 55, height: 55 }}
                                        />
                                    </Grid>
                                    <Grid xs={6} sm={9}>
                                        <Typography variant="body1">
                                            {"name"}
                                        </Typography>
                                        <Typography variant="body2">
                                            {"email"}
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    item
                                    spacing={2}
                                    xs={6}
                                    alignItems={"center"}
                                >
                                    <Grid item xs={12} sm={6} md={4}>
                                        <DropDown
                                            name="Rating"
                                            values={ratings}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Button
                                            variant="outlined"
                                            endIcon={<MessageIcon />}
                                        >
                                            Message
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid xs={12} pt={2}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Review"
                                    multiline
                                    rows={4}
                                    defaultValue={reviewText}
                                    sx={{ width: "100%" }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ReviewCard;
