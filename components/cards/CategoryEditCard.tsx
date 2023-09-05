import React, { useEffect, useState } from "react";
import {
    CustomDashboardCard,
    CustomButton,
    SelectField,
    CustomTextField,
} from "@/components";
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import useSWR from "swr";
import { toast } from "react-toastify";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

interface CategoryEditCardProps {
    data?: Record<string, any>[];
    handleCallback?: (formData: Record<string, any>) => void;
    handleDeleteCallback?: (id: string) => void;
}

type EditMode = true | false;

const CategoryEditCard: React.FC<CategoryEditCardProps> = ({
    data,
    handleCallback,
    handleDeleteCallback,
}) => {
    const {
        data: categories,
        error,
        isLoading,
    } = useSWR("/api/service/category", fetcher);
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
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1">
                                    Category
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="body1">Action</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {formData?.map((category, index) => (
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
                <Typography variant="body1">
                    Pick available category title or add your own
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <SelectField
                    id="title"
                    name="title"
                    onChange={(e) =>
                        setCategory({
                            ...category,
                            [e.target.name]: e.target.value,
                        })
                    }
                    value={category.title}
                    emptyValue="Category Title"
                    array={
                        !isLoading &&
                        categories.map((i: Record<string, any>) => i.title)
                    }
                    fieldState={false}
                    border={true}
                    padSize="default"
                />
            </Grid>
            <Grid item xs={12}>
                <CustomTextField
                    name="Category title"
                    value={category.title}
                    onChange={(e) =>
                        setCategory({
                            ...category,
                            title: e.target.value,
                        })
                    }
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

export default CategoryEditCard;
