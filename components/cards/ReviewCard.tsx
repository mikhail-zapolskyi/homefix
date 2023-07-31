import {
    Avatar,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Grid,
    Box,
} from "@mui/material";

import { CustomDashboardCard } from "@/components";
import MessageIcon from "@mui/icons-material/Message";
import DropDown from "../inputs/DropDown";

const ratings = ["1", "2", "3", "4", "5"];

const reviewText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.";

const ReviewCard = () => {
    return (
        <CustomDashboardCard>
            <Grid container xs={12} spacing={2}>
                <Grid container item xs={12}>
                    <Grid
                        item
                        container
                        xs={12}
                        sm={6}
                        sx={{ alignItems: "center", justifyContent: "start" }}
                    >
                        <Box>
                            <Avatar
                                src={`${"image"}`}
                                alt={`${"name"}`}
                                sx={{
                                    width: 55,
                                    height: 55,
                                    marginRight: "1rem",
                                }}
                            />
                        </Box>
                        <Box>
                            <Typography variant="body1">{"name"}</Typography>
                            <Typography variant="body2">{"email"}</Typography>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        sm={6}
                        sx={{
                            alignItems: "center",
                            justifyContent: {
                                xs: "space-around",
                                md: "center",
                            },
                        }}
                    >
                        <DropDown name="Rating" values={ratings} />
                        <Button variant="outlined" endIcon={<MessageIcon />}>
                            Message
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
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
        </CustomDashboardCard>
    );
};

export default ReviewCard;
