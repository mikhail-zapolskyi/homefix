"use client";
import React, { useEffect, useState } from "react";
import {
    CustomButton,
    CustomDashboardCard,
    CustomTextField,
    SelectField,
} from "@/components";
import {
    Grid,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import useSWR from "swr";
import { capitalizeFirstLetter } from "@/utils/helpers/capitalizeFirstLetter";

const fetcher = (url: URL) => fetch(url).then((res) => res.json());

interface ViewEditLocationProps {
    title?: string;
    data?: Record<string, any> | undefined;
    updateCallback?: (formData: Record<string, any>) => void;
}

type EditMode = true | false;

const ViewEditLocation: React.FC<ViewEditLocationProps> = ({
    title,
    data,
    updateCallback,
}) => {
    const [editMode, setEditMode] = useState<EditMode>(false);
    const [formData, setFormData] = useState<Record<string, any>>();
    const [locationParams, setLocationParams] = useState("");
    const {
        data: location,
        error,
        isLoading,
    } = useSWR(`/api/location${locationParams}`, fetcher, {});

    if (error) {
        throw new Error(error.message);
    }

    useEffect(() => {
        setLocationParams(
            `?country=${formData?.country}&state=${formData?.state}`
        );
    }, [formData?.country, formData?.state]);

    useEffect(() => {
        if (data) setFormData(data);
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

    const handleSelectOnChange = (
        e: SelectChangeEvent<unknown | string | number>
    ) => {
        const { name, value } = e.target;

        if (name === "country") {
            setFormData({
                ...formData,
                [name as string]: value,
                state: "",
                city: "",
            });
        } else if (name === "state") {
            setFormData({ ...formData, [name as string]: value, city: "" });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSave = () => {
        setEditMode(!editMode);

        if (updateCallback && formData) {
            updateCallback(formData);
        }
    };

    const handleCancel = () => {
        setFormData(data);
        setEditMode(false);
    };

    const renderLocatoinData = (
        <Grid container item xs={12} sx={{ justifyContent: { lg: "center" } }}>
            <TableContainer>
                <Table>
                    <TableBody>
                        {data &&
                            Object.entries(data).map(([key, value]) => (
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
                                            {capitalizeFirstLetter(key)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
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
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );

    const renderLocationEdit = (
        <Grid container item spacing={2} xs={12}>
            {formData && !isLoading && (
                <>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <CustomTextField
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleFormData}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <SelectField
                            id="country"
                            name="country"
                            emptyValue="Select Country"
                            value={formData.country || ""}
                            array={location.countries}
                            onChange={handleSelectOnChange}
                            fieldState={false}
                            border={true}
                            label={true}
                            padSize="default"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <SelectField
                            id="state"
                            name="state"
                            emptyValue="Select State/Province"
                            value={formData.state || ""}
                            array={location.states}
                            onChange={handleSelectOnChange}
                            fieldState={formData.country ? false : true}
                            border={true}
                            label={true}
                            padSize="default"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <SelectField
                            id="city"
                            name="city"
                            emptyValue="Select City"
                            value={formData.state ? formData.city || "" : ""}
                            array={location.cities}
                            onChange={handleSelectOnChange}
                            fieldState={formData.state ? false : true}
                            border={true}
                            label={true}
                            padSize="default"
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <CustomTextField
                            name="postalCode"
                            type="text"
                            value={formData.postalCode}
                            onChange={handleFormData}
                        />
                    </Grid>
                </>
            )}
        </Grid>
    );

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
                {editMode ? renderLocationEdit : renderLocatoinData}
            </Grid>
        </CustomDashboardCard>
    );
};

export default ViewEditLocation;
