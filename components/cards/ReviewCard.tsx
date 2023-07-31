"use client";
import { useState } from "react";
import {
    Avatar,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Grid,
    Box,
    SelectChangeEvent,
} from "@mui/material";
import { CustomDashboardCard } from "@/components";
import MessageIcon from "@mui/icons-material/Message";
import DropDown from "../inputs/DropDown";
import { SelectField } from "@/components";

const initialParams = {
    rating: "",
};

const reviewText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.";

const ReviewCard = () => {
    const [formData, setFormData] = useState(initialParams);

    const handleSelectOnChange = (
        e: SelectChangeEvent<unknown | string | number>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    return (
        <CustomDashboardCard>
            <Grid container xs={12} rowSpacing={4}>
                <Grid container item xs={12} rowSpacing={2}>
                    <Grid
                        item
                        container
                        xs={12}
                        sm={6}
                        sx={{ alignItems: "center", justifyContent: "start" }}
                    >
                        <Grid item>
                            <Avatar
                                src={`${"image"}`}
                                alt={`${"name"}`}
                                sx={{
                                    width: 55,
                                    height: 55,
                                    marginRight: "1rem",
                                }}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body1">{"name"}</Typography>
                            <Typography variant="body2">{"email"}</Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        sm={6}
                        sx={{
                            alignItems: "start",
                            justifyContent: {
                                xs: "space-around",
                                md: "center",
                            },
                        }}
                    >
                        <Grid item>
                            <SelectField
                                id="rating"
                                name="rating"
                                emptyValue="Select Rating"
                                value={formData.rating}
                                array={[1, 2, 3, 4, 5]}
                                onChange={handleSelectOnChange}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                endIcon={<MessageIcon />}
                            >
                                Message
                            </Button>
                        </Grid>
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
