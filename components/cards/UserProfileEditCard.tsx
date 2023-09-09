"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Typography, Grid } from "@mui/material";
import {
    CustomTextField,
    CustomDashboardCard,
    CustomButton,
    ImageUploadButton,
} from "@/components";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

interface UserProfileEditCardProps {
    data?: Record<string, any>;
    handleCallback?: (formData: Record<string, any>) => void;
}

type EditMode = true | false;

const UserProfileEditCard: React.FC<UserProfileEditCardProps> = ({
    data,
    handleCallback,
}) => {
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

    const handleUploadImage = (file: File) => {
        console.log(file);
    };

    const renderData = (
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

    const renderEditData = (
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
    const handleCancel = () => {
        setEditMode(false);
    };

    const renderSaveButton = <CustomButton text="Save" onClick={handleSave} />;
    const renderCancelButton = (
        <CustomButton text="Cancel" color="warning" onClick={handleCancel} />
    );
    const renderEditButton = (
        <CustomButton
            text="Edit"
            onClick={handleEditMode}
            endIcon={<DriveFileRenameOutlineIcon />}
        />
    );

    return (
        <CustomDashboardCard>
            {formData && (
                <Grid container rowSpacing={3}>
                    <Grid container item xs={12} spacing={{ xs: 2 }}>
                        <Grid
                            container
                            item
                            xs={12}
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
                                    <Typography variant="body1">
                                        {formData?.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <ImageUploadButton
                                        handleCallback={handleUploadImage}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={12}
                            sm={6}
                            sx={{
                                alignItems: "center",
                                justifyContent: { xs: "center", sm: "end" },
                            }}
                            columnSpacing={1}
                        >
                            {editMode ? (
                                <>
                                    <Grid item>{renderSaveButton}</Grid>
                                    <Grid item>{renderCancelButton}</Grid>
                                </>
                            ) : (
                                <Grid item>{renderEditButton}</Grid>
                            )}
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
                        {editMode ? renderEditData : renderData}
                    </Grid>
                </Grid>
            )}
        </CustomDashboardCard>
    );
};

export default UserProfileEditCard;
