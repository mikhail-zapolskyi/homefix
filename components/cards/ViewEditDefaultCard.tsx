import React, { ReactNode, useEffect, useState } from "react";
import CustomDashboardCard from "./CustomDashboardCard";
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextareaAutosize,
    Typography,
} from "@mui/material";
import CustomButton from "../button/CustomButton";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CustomTextField from "../inputs/CustomTextField";
import { toFirstUpperCase } from "@/utils/helpers/toFirstUpperCase";

interface ViewEditDefaultCardProps {
    data?: Record<string, any>;
    title?: string;
    icon?: ReactNode;
    isLoading?: boolean;
    saveCallback?: (formData: Record<string, any>) => void;
    deleteCallback?: (formData: Record<string, any>) => void;
}

type EditMode = true | false;

const ViewEditDefaultCard: React.FC<ViewEditDefaultCardProps> = ({
    data,
    title,
    icon,
    isLoading = false,
    saveCallback,
    deleteCallback,
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

    const handleFormData = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        e.preventDefault();
        let value: string | number = e.target.value;
        if (e.target.type === "number") {
            value = parseFloat(e.target.value);
        }
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSave = () => {
        setEditMode(!editMode);

        if (saveCallback && formData) {
            saveCallback(formData);
        }
    };

    const isImageOrRating = (key: string) => {
        if (key === "image" || key === "rating") {
            return true;
        }

        return false;
    };

    const isTextAreaNeeded = (key: string) => {
        if (
            key === "bio" ||
            key === "schedualPolicy" ||
            key === "introduction"
        ) {
            return true;
        }
        return false;
    };

    const handleCancel = () => {
        setFormData(data);
        setEditMode(false);
    };

    const handleDeleteCallback = (key: string) => {
        if (deleteCallback && key) {
            deleteCallback({ [key]: "" });
        }
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

    const renderInfo = (
        <Grid container item xs={12}>
            <TableContainer>
                <Table>
                    <TableBody>
                        {data &&
                            Object.entries(data).map(
                                ([key, value]) =>
                                    !isImageOrRating(key) && (
                                        <TableRow
                                            key={key}
                                            sx={{
                                                "&:last-child td, &:last-child th":
                                                    {
                                                        border: 0,
                                                    },
                                            }}
                                        >
                                            <TableCell>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: 800,
                                                    }}
                                                >
                                                    {toFirstUpperCase(key)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: 800,
                                                    }}
                                                >
                                                    {value
                                                        ? value
                                                        : `Please add your ${key}`}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                {value ? (
                                                    <CustomButton
                                                        text="Delete"
                                                        onClick={() =>
                                                            handleDeleteCallback(
                                                                key
                                                            )
                                                        }
                                                        color="warning"
                                                        variant="contained"
                                                        padsize="none"
                                                    />
                                                ) : (
                                                    <></>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
    const renderEditInfo = (
        <Grid container item xs={12}>
            {data &&
                Object.entries(data).map(([key, value]) => {
                    return !isImageOrRating(key) && isTextAreaNeeded(key) ? (
                        <Grid
                            item
                            xs={12}
                            key={key}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <TextareaAutosize
                                name={key}
                                placeholder={value}
                                onChange={handleFormData}
                            />
                        </Grid>
                    ) : (
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
                                    key === "experience" || key === "employees"
                                        ? "number"
                                        : "text"
                                }
                                placeholder={value}
                                value={formData && formData[key]}
                                onChange={handleFormData}
                            />
                        </Grid>
                    );
                })}
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
                    spacing={1}
                >
                    {editMode ? (
                        <>
                            <Grid item>{renderSaveButton}</Grid>
                            <Grid item>{renderCancelButton}</Grid>
                        </>
                    ) : (
                        renderEditButton
                    )}
                </Grid>
                {editMode ? renderEditInfo : renderInfo}
            </Grid>
        </CustomDashboardCard>
    );
};

export default ViewEditDefaultCard;
