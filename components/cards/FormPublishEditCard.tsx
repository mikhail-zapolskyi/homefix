import React, { useEffect, useState } from "react";
import CustomButton from "../button/CustomButton";
import { Grid, Rating, Typography } from "@mui/material";
import CustomDashboardCard from "./CustomDashboardCard";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import StarIcon from "@mui/icons-material/Star";

interface FormPublishEditCardProps {
    data?: Record<string, any>;
    handleCallback?: (formData: Record<string, any>) => void;
}

const FormPublishEditCard: React.FC<FormPublishEditCardProps> = ({
    data,
    handleCallback,
}) => {
    const [formData, setFormData] = useState<Record<string, any>>({
        rating: 0,
    });

    useEffect(() => {
        setFormData({ ...formData, ...data });
    }, [data]);

    const handleSave = () => {
        const newData = {
            ...formData,
            published: !formData?.published,
        };

        if (handleCallback && formData) {
            handleCallback(newData);
        }
    };

    return (
        <CustomDashboardCard>
            <Grid container sx={{ alignItems: "center" }} rowSpacing={2}>
                <Grid
                    container
                    item
                    xs={12}
                    sx={{ alignItems: "center", justifyContent: "center" }}
                    spacing={2}
                >
                    <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Typography variant="h6">Rating</Typography>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Rating
                            name="text-feedback"
                            value={formData ? formData.rating : 0}
                            readOnly
                            precision={0.1}
                            emptyIcon={
                                <StarIcon
                                    style={{ opacity: 0.55 }}
                                    fontSize="inherit"
                                />
                            }
                        />
                        <Typography variant="h6" ml={2}>
                            {formData?.rating || 0}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    item
                    xs={12}
                    sx={{ alignItems: "center", justifyContent: "center" }}
                >
                    <CustomButton
                        text={
                            !formData?.published
                                ? "Publish Profile"
                                : "Unpublish Profile"
                        }
                        endIcon={<PublishedWithChangesIcon />}
                        onClick={handleSave}
                        variant="contained"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </CustomDashboardCard>
    );
};

export default FormPublishEditCard;
