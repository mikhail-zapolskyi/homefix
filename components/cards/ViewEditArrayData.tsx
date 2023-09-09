import React, { ChangeEvent, useEffect, useState } from "react";
import CustomDashboardCard from "./CustomDashboardCard";
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CustomButton from "../button/CustomButton";
import CustomTextField from "../inputs/CustomTextField";
import _ from "lodash";
import { toFirstUpperCase } from "@/utils/helpers/toFirstUpperCase";

interface ViewEditArrayDataProps {
    arrays?: Record<string, any>;
    handleCallback?: (formData: Record<string, any>) => void;
    handleDeleteDayCallback?: (day: Record<string, any>) => void;
}

type EditMode = true | false;

const ViewEditArrayData: React.FC<ViewEditArrayDataProps> = ({
    arrays,
    handleCallback,
}) => {
    // State to manage edit mode
    const [editMode, setEditMode] = useState<EditMode>(false);
    const [openInputKey, setOpenInputKey] = useState<string | null>(null);

    // State to manage form data
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        // Update formData when arrays prop changes
        if (arrays) {
            setFormData(arrays);
        }
    }, [arrays]);

    const handleSave = () => {
        // Toggle edit mode
        setEditMode(!editMode);

        if (handleCallback && formData) {
            // Call the callback with updated form data
            handleCallback(formData);
        }
    };

    const handleCancel = () => {
        // Reset form data and exit edit mode
        setFormData(arrays || {});
        setEditMode(false);
    };

    const handleEditMode = () => {
        // Toggle edit mode
        setEditMode(!editMode);
    };

    const handleSaveInput = (key: string) => {
        // Add inputValue to the selected key in formData
        const updatedFormData = _.cloneDeep(formData);
        updatedFormData[key].push(inputValue);
        setFormData(updatedFormData);
        cancelInput();
    };

    const handleAddButtonClick = (key: string) => {
        // Show input field for adding data
        setOpenInputKey(key);
    };

    const cancelInput = () => {
        // Clear input field and close it
        setInputValue("");
        setOpenInputKey(null);
    };

    const handleDeleteItem = (key: string, item: string) => {
        // Delete item from formData key array
        const updatedFormData = _.cloneDeep(formData);
        const index = updatedFormData[key].indexOf(item);
        updatedFormData[key].splice(index, 1);
        setFormData(updatedFormData);
    };

    // Render buttons
    const renderSaveButton = <CustomButton text="Save" onClick={handleSave} />;
    const renderCancelButton = (
        <CustomButton text="Cancel" color="warning" onClick={handleCancel} />
    );
    const renderCancelInputButton = (
        <CustomButton text="Cancel" color="warning" onClick={cancelInput} />
    );
    const renderEditButton = (
        <CustomButton
            text="Edit"
            onClick={handleEditMode}
            endIcon={<DriveFileRenameOutlineIcon />}
        />
    );

    // Render form data
    const renderFormData = (
        <Grid container item xs={12} spacing={2}>
            <TableContainer>
                <Table>
                    <TableBody>
                        {arrays &&
                            Object.entries(arrays).map(([key, value]) => (
                                <TableRow
                                    key={key}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
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
                                            {value &&
                                                value
                                                    .toString()
                                                    .replace(/,/g, ", ")}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );

    const renderEditFormData = (
        <Grid container item xs={12} spacing={2}>
            {formData &&
                Object.entries(formData).map(([key, value]) => (
                    <React.Fragment key={key}>
                        <Grid container item xs={12} sm={9} spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="body1">
                                    {key.charAt(0).toUpperCase() +
                                        key.slice(1).replace("_", " ")}
                                    :
                                </Typography>
                            </Grid>
                            <Grid
                                container
                                item
                                xs={12}
                                sx={{ alignItems: "center" }}
                                spacing={1}
                            >
                                {value &&
                                    value.map((item: string) => (
                                        <Grid item key={item}>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    border: "solid 1px lightgray",
                                                    padding: "0.4rem",
                                                    borderRadius: "0.8rem",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    handleDeleteItem(key, item)
                                                }
                                            >
                                                {item}
                                            </Typography>
                                        </Grid>
                                    ))}
                                <Grid item>
                                    {openInputKey !== key && (
                                        <CustomButton
                                            text="Add"
                                            onClick={() =>
                                                handleAddButtonClick(key)
                                            }
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={8}
                            sx={{ alignItems: "center" }}
                            spacing={1}
                        >
                            {openInputKey === key && (
                                <Grid item xs={8}>
                                    <CustomTextField
                                        name={key}
                                        value={inputValue}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) => setInputValue(e.target.value)}
                                    />
                                </Grid>
                            )}
                            <Grid container item xs={4} spacing={1}>
                                {openInputKey === key && (
                                    <>
                                        <Grid item>
                                            <CustomButton
                                                text="Save"
                                                onClick={() =>
                                                    handleSaveInput(key)
                                                }
                                            />
                                        </Grid>
                                        <Grid item>
                                            {renderCancelInputButton}
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </React.Fragment>
                ))}
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
                    <Typography variant="h6">Other Options</Typography>
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
                {editMode ? renderEditFormData : renderFormData}
            </Grid>
        </CustomDashboardCard>
    );
};

export default ViewEditArrayData;
