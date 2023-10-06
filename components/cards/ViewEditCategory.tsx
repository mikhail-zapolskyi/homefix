import React, { useEffect, useState } from "react";
import {
    CustomDashboardCard,
    CustomButton,
    SelectCreateField,
} from "@/components";
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
import useSWR from "swr";
import { toast } from "react-toastify";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

interface ViewEditCategoryProps {
    data?: Record<string, any>[];
    handleCallback?: (formData: Record<string, any>) => void;
    handleDeleteCallback?: (id: string) => void;
}

type EditMode = true | false;

const ViewEditCategory: React.FC<ViewEditCategoryProps> = ({
    data,
    handleCallback,
    handleDeleteCallback,
}) => {
    const {
        data: categories,
        error,
        isLoading,
    } = useSWR("/api/service/category", fetcher, {});
    const [editMode, setEditMode] = useState<EditMode>(false);
    const [formData, setFormData] = useState<Record<string, any>[] | undefined>(
        data
    );
    const [category, setCategory] = useState({ title: "" });

    if (error) {
        toast.error(error.message);
    }

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleSave = () => {
        if (handleCallback && category) {
            handleCallback(category);
        }

        handleCancel();
    };

    const handleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleCancel = () => {
        setCategory({ title: "" });
        setEditMode(false);
    };

    const handleDelete = (id: string) => {
        if (handleDeleteCallback && id) {
            handleDeleteCallback(id);
        }
    };

    const handleOnInputCategoryChange = (
        e: React.SyntheticEvent,
        value: string,
        reason: string
    ) => {
        setCategory({ ...category, title: value });
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

    const renderData = (
        <Grid container item xs={12}>
            <TableContainer>
                <Table>
                    <TableBody>
                        {formData?.map((category) => (
                            <TableRow
                                key={category.categoryId}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 800 }}
                                    >
                                        {category.category.title
                                            .charAt(0)
                                            .toUpperCase() +
                                            category.category.title.slice(1)}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <CustomButton
                                        text="Delete"
                                        color="warning"
                                        variant="contained"
                                        onClick={() =>
                                            handleDelete(category.id)
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
    const renderEdit = (
        <Grid container item xs={12} spacing={2}>
            <Grid item xs={12}>
                <SelectCreateField
                    array={!isLoading && categories}
                    onInputChange={handleOnInputCategoryChange}
                />
            </Grid>
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
                    <Typography variant="h6">
                        Service Profile Categories
                    </Typography>
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
                {editMode ? renderEdit : renderData}
            </Grid>
        </CustomDashboardCard>
    );
};

export default ViewEditCategory;
