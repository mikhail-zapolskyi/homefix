import {
    Avatar,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import MessageIcon from "@mui/icons-material/Message";
import DropDown from "../inputs/DropDown";

const ratings = ["1", "2", "3", "4", "5"];

const reviewText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.";

const ReviewCard = () => {
    return (
        <Grid container margin={2}>
            <Grid xs={12}>
                <Card>
                    <CardContent>
                        <Grid>
                            <Grid
                                container
                                alignItems="center"
                                justifyContent={"space-between"}
                            >
                                <Grid container xs={5} sm={6}>
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
                                    xs={6}
                                    sm={5}
                                    md={3}
                                    alignItems={"center"}
                                >
                                    <Grid xs={12} sm={6}>
                                        <DropDown
                                            name="Rating"
                                            values={ratings}
                                        />
                                    </Grid>
                                    <Grid xs={12} sm={6}>
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
