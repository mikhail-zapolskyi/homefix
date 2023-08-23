import React, { ReactNode, useEffect, useState } from "react";
import CustomDashboardCard from "./CustomDashboardCard";
import { Grid, TextareaAutosize, Typography } from "@mui/material";
import CustomButton from "../button/CustomButton";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CustomTextField from "../inputs/CustomTextField";

interface DefaultFormEditCardProps {
    data?: Record<string, any>;
    title?: string;
    icon?: ReactNode;
    isLoading?: boolean;
    handleCallback?: (formData: Record<string, any>) => void;
}

type EditMode = true | false;

const DefaultFormEditCard: React.FC<DefaultFormEditCardProps> = ({
    data,
    title,
    icon,
    isLoading = false,
    handleCallback,
}) => {
    const [editMode, setEditMode] = useState<EditMode>(false);
    const [formData, setFormData] = useState<Record<string, any> | undefined>(
        data
    );

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let value: string | number = e.target.value;
        if (e.target.type === "number") {
            value = parseFloat(e.target.value);
        }
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSave = () => {
        setEditMode(!editMode);

        if (handleCallback && formData) {
            handleCallback(formData);
        }
    };

    const renderSaveButton = <CustomButton text="Save" onClick={handleSave} />;
    const renderEditButton = (
        <CustomButton
            text="Edit"
            onClick={handleEditMode}
            endIcon={<DriveFileRenameOutlineIcon />}
        />
    );

    const renderInfo = (
        <Grid container item xs={12} spacing={2}>
            {data &&
                Object.entries(data).map(
                    ([key, value]) =>
                        key !== "image" && (
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
    const renderEditInfo = (
        <Grid container item spacing={2} xs={12}>
            {data &&
                Object.entries(data).map(
                    ([key, value]) =>
                        key !== "image" &&
                        (key === "bio" ||
                        key === "schedualPolicy" ||
                        key === "introduction" ? (
                            <Grid
                                item
                                xs={12}
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
                                <TextareaAutosize
                                    name={key}
                                    placeholder={value}
                                />
                            </Grid>
                        ) : (
                            <Grid
                                item
                                xs={6}
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
                                <CustomTextField
                                    name={key}
                                    type={isNaN(value) ? "text" : "number"}
                                    placeholder={
                                        isNaN(value) ? value : value.toString()
                                    }
                                    value={formData && formData[key]}
                                    onChange={handleFormData}
                                />
                            </Grid>
                        ))
                )}
        </Grid>
    );

    return (
        <CustomDashboardCard>
            <Grid container sx={{ alignItems: "center" }} rowSpacing={4}>
                <Grid
                    container
                    item
                    xs={6}
                    sx={{ alignItems: "center", justifyContent: "start" }}
                >
                    <Typography variant="h6">{title}</Typography>
                </Grid>
                <Grid
                    container
                    item
                    xs={6}
                    sx={{ alignItems: "center", justifyContent: "end" }}
                >
                    {editMode ? renderSaveButton : renderEditButton}
                </Grid>
                {editMode ? renderEditInfo : renderInfo}
            </Grid>
        </CustomDashboardCard>
    );
};

export default DefaultFormEditCard;
