import React, {
    ChangeEvent,
    DragEvent,
    MouseEvent,
    useRef,
    useState,
} from "react";
import { CustomButton, CustomDashboardCard } from "@/components";
import { Avatar, Grid, Typography, styled } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { toast } from "react-toastify";

const UplodArea = styled("div")(({ theme }) => ({
    width: "100%",
    minHeight: "7rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.common.black}`,
    borderRadius: "0.8rem",
}));

interface ImageUploadCardProps {
    variant?: "circular" | "rounded" | "square";
    data?: Record<string, any>;
    handleCallback?: (file: File) => void;
}

const UplodInput = styled("input")(() => ({
    display: "none",
}));

const ImageUploadCard: React.FC<ImageUploadCardProps> = ({
    variant,
    data,
    handleCallback,
}) => {
    const [editMode, setEditMode] = useState(false);
    const [dragFile, setDragFile] = useState(false);
    const [file, setFile] = useState<File>();
    const [fileDetails, setFileDetails] = useState({ name: "", size: 0 });
    const fileInput = useRef<HTMLInputElement>(null);

    const handleEditStateMode = () => {
        setEditMode(!editMode);
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragFile(true);
    };

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragFile(false);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragFile(false);
        const droppedFile = event.dataTransfer.files[0];

        const name = droppedFile.name.slice(0, 20);
        const type = droppedFile.type;
        const size = parseFloat((droppedFile.size / 1024 ** 2).toFixed(1));

        if (!type.startsWith("image/")) {
            toast.error("Please upload image only");
            return;
        }

        setFile(droppedFile);
        setFileDetails({
            ...fileDetails,
            name,
            size,
        });
    };

    const handleInputUpload = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (!e.target.files) {
            return;
        }

        const uploadedFile = e.target.files[0];
        const name = uploadedFile.name.slice(0, 20);
        const type = uploadedFile.type;
        const size = parseFloat((uploadedFile.size / 1024 ** 2).toFixed(1));

        if (!type.startsWith("image/")) {
            toast.error("Please upload image only");
            return;
        }

        setFile(uploadedFile);
        setFileDetails({
            ...fileDetails,
            name,
            size,
        });
    };

    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };

    const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (handleCallback && file) {
            handleCallback(file);
        }

        setEditMode(!editMode);
        setFileDetails({
            name: "",
            size: 0,
        });
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    const renderImage = (
        <>
            <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
            >
                <Avatar
                    src={data?.image}
                    variant={variant}
                    alt="Avatar"
                    sx={{
                        width: 200,
                        height: 200,
                        ".MuiAvatar-img": {
                            objectFit: "fill",
                        },
                    }}
                />
            </Grid>
            <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
            >
                <CustomButton
                    text="Edit"
                    endIcon={<DriveFileRenameOutlineIcon />}
                    onClick={handleEditStateMode}
                    fullWidth
                />
            </Grid>
        </>
    );

    const renderImageEditMode = (
        <>
            <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
            >
                <Typography variant="h5">upload image</Typography>
            </Grid>
            <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
            >
                <Typography variant="body1">
                    Image must be less then 2 MB
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <UplodArea
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    sx={{ backgroundColor: dragFile ? "white" : "none" }}
                >
                    {fileDetails.name || fileDetails.size ? (
                        <>
                            <Typography
                                variant="body1"
                                sx={{ fontWeight: 800, textAlign: "center" }}
                            >
                                {fileDetails.name}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontWeight: 800 }}
                            >
                                {fileDetails.size} MB
                            </Typography>
                        </>
                    ) : (
                        <Typography variant="body1" sx={{ fontWeight: 800 }}>
                            Drop image here
                        </Typography>
                    )}
                </UplodArea>
            </Grid>
            <Grid
                container
                item
                xs={12}
                sx={{ justifyContent: "center" }}
                spacing={1}
            >
                <Grid item xs={12}>
                    <CustomButton
                        text="Uplolad File"
                        fullWidth
                        onClick={handleClick}
                    />
                    <UplodInput
                        ref={fileInput}
                        type="file"
                        onChange={handleInputUpload}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomButton text="Save" fullWidth onClick={handleSave} />
                </Grid>
                <Grid item xs={12}>
                    <CustomButton
                        text="Cancel"
                        fullWidth
                        onClick={handleCancel}
                        color="warning"
                    />
                </Grid>
            </Grid>
        </>
    );

    return (
        <CustomDashboardCard>
            <Grid container rowSpacing={2}>
                {editMode ? renderImageEditMode : renderImage}
            </Grid>
        </CustomDashboardCard>
    );
};

export default ImageUploadCard;
