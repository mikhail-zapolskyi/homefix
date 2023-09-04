"use client";
import React, { useEffect, useState } from "react";
import {
    CustomButton,
    CustomDashboardCard,
    CustomTextField,
    SelectField,
} from "@/components";
import { Grid, SelectChangeEvent, Typography } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import useSWR from "swr";

const fetcher = (url: URL) => fetch(url).then((res) => res.json());

interface LocationCardProps {
    title?: string;
    location?: Record<string, any>;
    handleCallback?: (formData: Record<string, any>) => void;
}

type EditMode = true | false;

const LocationCard: React.FC<LocationCardProps> = ({
    title,
    location,
    handleCallback,
}) => {
    const [editMode, setEditMode] = useState<EditMode>(false);
    const [formData, setFormData] = useState<Record<string, any>>();
    const [locationParams, setLocationParams] = useState("");
    const { data, error, isLoading } = useSWR(
        `/api/location${locationParams}`,
        fetcher
    );

    if (error) {
        throw new Error(error.message);
    }

    useEffect(() => {
        setLocationParams(
            `?country=${formData?.country}&state=${formData?.state}`
        );
    }, [formData?.country, formData?.state]);

    useEffect(() => {
        setFormData(location);
    }, [location]);

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

        if (handleCallback && formData) {
            handleCallback(formData);
        }
    };

    const handleCancel = () => {
        setFormData(location);
        setEditMode(false);
    };

    const renderLocatoinDetails = (
        <Grid container item xs={12} spacing={2} component="form" noValidate>
            {formData &&
                Object.entries(formData).map(([key, value]) => (
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
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800 }}>
                            {value}
                        </Typography>
                    </Grid>
                ))}
        </Grid>
    );

    const renderEditLocation = (
        <Grid container item spacing={2} xs={12}>
            {formData && data && (
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
                            array={data.countries}
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
                            array={data.states}
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
                            array={data.cities}
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
                {editMode ? renderEditLocation : renderLocatoinDetails}
            </Grid>
        </CustomDashboardCard>
    );
};

export default LocationCard;
