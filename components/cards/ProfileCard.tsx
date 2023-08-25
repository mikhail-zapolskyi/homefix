"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Typography, Button, Grid } from "@mui/material";
import {
    CustomTextField,
    CustomDashboardCard,
    CustomButton,
} from "@/components";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

interface ProfileCard {
    data?: Record<string, any>;
    handleCallback?: (formData: Record<string, any>) => void;
}

type EditMode = true | false;

const ProfileCard: React.FC<ProfileCard> = ({ data, handleCallback }) => {
    const [editMode, setEditMode] = useState<EditMode>(false);
    const [formData, setFormData] = useState<Record<string, any>>();

    useEffect(() => {
        setFormData({ ...formData, ...data });
    }, [data]);

    const handleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleSave = () => {
        setEditMode(!editMode);

        if (handleCallback && formData) {
            handleCallback(formData);
        }
    };

    const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let value: string | number = e.target.value;
        if (e.target.type === "number") {
            value = parseFloat(e.target.value);
        }
        setFormData({ ...formData, [e.target.name]: value });
    };

    const renderUserInfo = (
        <Grid container item xs={12} spacing={2}>
            {formData &&
                Object.entries(formData).map(
                    ([key, value]) =>
                        key !== "image" &&
                        key !== "password" && (
                            <Grid
                                item
                                xs={12}
                                sm={9}
                                key={key}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography variant="body1">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                    :
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 800 }}
                                >
                                    {value}
                                </Typography>
                            </Grid>
                        )
                )}
        </Grid>
    );

    const renderUserEditFields = (
        <Grid container item spacing={2} xs={12}>
            {formData &&
                Object.entries(formData).map(
                    ([key, value]) =>
                        key !== "image" && (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                key={key}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <CustomTextField
                                    name={key}
                                    type={
                                        key === "password" ? "password" : "text"
                                    }
                                    value={formData.value}
                                    onChange={handleFormData}
                                />
                            </Grid>
                        )
                )}
        </Grid>
    );

    const renderSaveButton = <CustomButton text="Save" onClick={handleSave} />;
    const renderEditButton = (
        <CustomButton
            text="Edit"
            onClick={handleEditMode}
            endIcon={<DriveFileRenameOutlineIcon />}
        />
    );
    const renderMessageButton = (
        <CustomButton text="Message" variant="contained" />
    );

    return (
        <CustomDashboardCard>
            {formData && (
                <Grid container rowSpacing={3}>
                    <Grid container item xs={12}>
                        <Grid
                            container
                            item
                            sm={6}
                            sx={{
                                alignItems: "center",
                                justifyContent: "start",
                            }}
                            columnSpacing={2}
                        >
                            <Grid item>
                                <Avatar
                                    src={`${formData.image}`}
                                    alt={`${formData?.name}`}
                                    sx={{
                                        width: 70,
                                        height: 70,
                                    }}
                                />
                            </Grid>
                            <Grid container item xs={8}>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="body1"
                                        sx={{ marginLeft: 0.8 }}
                                    >
                                        {formData?.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button size="small">Upload Photo</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            sm={6}
                            sx={{
                                alignItems: "center",
                                justifyContent: "end",
                            }}
                            columnSpacing={1}
                        >
                            <Grid item>{renderMessageButton}</Grid>
                            <Grid item>
                                {editMode ? renderSaveButton : renderEditButton}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        lg={8}
                        spacing={2}
                        sx={{ maxWidth: 600 }}
                    >
                        {editMode ? renderUserEditFields : renderUserInfo}
                    </Grid>
                </Grid>
            )}
        </CustomDashboardCard>
    );
};

export default ProfileCard;
