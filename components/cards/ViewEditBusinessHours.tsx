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
    styled,
} from "@mui/material";
import CustomButton from "../button/CustomButton";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { capitalizeFirstLetter } from "@/utils/helpers/capitalizeFirstLetter";
// Define the props for the BusinessHoursEditCard component
interface ViewEditBusinessHoursProps {
    businessHours?: Record<string, any>[];
    handleSaveDayCallback?: (formData: Record<string, any>[]) => void;
    handleDeleteDayCallback?: (day: Record<string, any>) => void;
}

// Define a type for the edit mode (true or false)
type EditMode = true | false;

// Style Input

const StyledTimeInput = styled("input")(({ theme }) => ({
    minWidth: "7rem",
    padding: ".5rem",
    borderRadius: "0.8rem",
    border: `solid 1px lightgray`,
    background: "transparent",
    "&:active": {
        border: `solid 1px ${theme.palette.primary.light}`,
    },
    fontFamily: `${theme.typography.body1}`,
}));

// Define the ViewEditBusinessHours component
const ViewEditBusinessHours: React.FC<ViewEditBusinessHoursProps> = ({
    businessHours,
    handleSaveDayCallback,
    handleDeleteDayCallback,
}) => {
    // State to manage edit mode
    const [editMode, setEditMode] = useState<EditMode>(false);

    // State to manage form data
    const [formData, setFormData] = useState<Record<string, any>[]>([]);

    // Effect to update form data when businessHours prop changes
    useEffect(() => {
        if (businessHours !== undefined) {
            setFormData(businessHours);
        }
    }, [businessHours]);

    // Function to handle saving changes
    const handleSave = () => {
        setEditMode(!editMode);

        // If a callback function is provided, call it with the updated form data
        if (handleSaveDayCallback && formData) {
            handleSaveDayCallback(formData);
        }
    };

    // Function to toggle edit mode
    const handleEditMode = () => {
        setEditMode(!editMode);
    };

    // Function to handle changes in time input fields
    const handleTimeChange = (
        e: ChangeEvent<HTMLInputElement>,
        day: string
    ) => {
        e.preventDefault();
        const newData = [...formData];
        const index = newData.findIndex((time) => time.type === day);
        newData[index] = { ...newData[index], [e.target.name]: e.target.value };
        setFormData(newData);
    };

    // Function to delete a day's data
    const handleDeleteDay = (day: string) => {
        const newData = [...formData];
        const index = newData.findIndex((time) => time.type === day);
        if (handleDeleteDayCallback && day) {
            handleDeleteDayCallback(newData[index]);
        }
        newData.splice(index, 1);
        setFormData(newData);
    };

    // Function to add a new day's data
    const handleAddDay = (day: string) => {
        setFormData([...formData, { type: day, from: "07:00", to: "17:00" }]);
    };

    // Render the "Save" button
    const renderSaveButton = <CustomButton text="Save" onClick={handleSave} />;

    // Render the "Edit" button
    const renderEditButton = (
        <CustomButton
            text="Edit"
            onClick={handleEditMode}
            endIcon={<DriveFileRenameOutlineIcon />}
        />
    );

    // Define the days of the week
    const daysOfWeek = [
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
    ];

    // Render the non-editable business hours display
    const renderBusinessHours = (
        <Grid container item xs={12}>
            <TableContainer>
                <Table>
                    <TableBody>
                        {formData &&
                            formData
                                .sort((a, b) => {
                                    return (
                                        daysOfWeek.indexOf(a.type) -
                                        daysOfWeek.indexOf(b.type)
                                    );
                                })
                                .map((time) => (
                                    <TableRow
                                        key={time.type}
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
                                                {capitalizeFirstLetter(
                                                    time.type
                                                )}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 800,
                                                }}
                                            >
                                                {time.from + " - " + time.to}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );

    // Render the editable business hours form
    const renderEditBusinessHours = (
        <>
            <Grid container item spacing={2} xs={12}>
                {daysOfWeek.map((day, i) => {
                    const existingDayData = formData.find(
                        (data) => data.type === day
                    );

                    return (
                        <React.Fragment key={day + i}>
                            <Grid item xs={12}>
                                <Typography variant="body1" mr={1}>
                                    {day}
                                </Typography>
                            </Grid>
                            {existingDayData ? (
                                <Grid
                                    container
                                    item
                                    xs={12}
                                    spacing={1}
                                    sx={{ alignItems: "center" }}
                                >
                                    {Object.entries(existingDayData).map(
                                        ([key, value], i) =>
                                            key === "from" || key === "to" ? (
                                                <Grid item key={key + i}>
                                                    <StyledTimeInput
                                                        type="time"
                                                        name={key}
                                                        value={value}
                                                        onChange={(e) =>
                                                            handleTimeChange(
                                                                e,
                                                                existingDayData.type
                                                            )
                                                        }
                                                    />
                                                </Grid>
                                            ) : null
                                    )}
                                    <Grid item>
                                        <CustomButton
                                            text="Remove"
                                            color="warning"
                                            onClick={() =>
                                                handleDeleteDay(
                                                    existingDayData.type
                                                )
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid item>
                                    <CustomButton
                                        text="Add"
                                        onClick={() => handleAddDay(day)}
                                    />
                                </Grid>
                            )}
                        </React.Fragment>
                    );
                })}
            </Grid>
        </>
    );

    // Render the ViewEditBusinessHours component
    return (
        <CustomDashboardCard>
            <Grid container sx={{ alignItems: "center" }} rowSpacing={4}>
                <Grid
                    container
                    item
                    xs={6}
                    sx={{ alignItems: "center", justifyContent: "start" }}
                >
                    <Typography variant="h6">Business Hours</Typography>
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
                        </>
                    ) : (
                        renderEditButton
                    )}
                </Grid>
                {editMode ? renderEditBusinessHours : renderBusinessHours}
            </Grid>
        </CustomDashboardCard>
    );
};

export default ViewEditBusinessHours;
