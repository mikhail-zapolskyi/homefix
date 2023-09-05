import { ChangeEvent, useState } from "react";
import {
    Box,
    Button,
    Typography,
    Modal,
    Grid,
    TextField,
    SelectChangeEvent,
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import SelectField from "../inputs/SelectField";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 400,
    maxWidth: 1000,
    bgcolor: "background.paper",
    borderRadius: "1rem",
    boxShadow: 24,
    p: 4,
};

interface Props {
    proId: string;
    serviceId: string;
    name: string | null;
    desc: string | null;
}

const AddReviewModal = ({ proId, serviceId, name, desc }: Props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [rating, setRating] = useState<number | string>("");
    const [review, setReview] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectOnChange = (e: SelectChangeEvent<unknown>) => {
        const value = Number(e.target.value);
        setRating(value);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setReview(e.target.value);
    };

    const handleClick = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:3000/api/reviews", {
                method: "POST",
                body: JSON.stringify({
                    comment: review,
                    rating,
                    proId,
                    serviceId,
                }),
            });

            if (response.ok) {
                handleClose();
                return;
            }

            return console.log("user not found");
        } catch (error) {
            console.error("An error occurred", error);
        }
        setIsLoading(false);
    };

    return (
        <div>
            <Button
                onClick={handleOpen}
                variant="outlined"
                endIcon={<AddCommentIcon />}
            >
                Add Review
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Review Moneer Plumbing
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        service description Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Ducimus, quibusdam?
                    </Typography>

                    <Grid container item xs={12} rowSpacing={2}>
                        <Grid item xs={6} sm={6} md={4}>
                            <SelectField
                                id="rating"
                                name="rating"
                                emptyValue="Select Rating"
                                value={rating}
                                array={[1, 2, 3, 4, 5]}
                                fieldState={false}
                                onChange={handleSelectOnChange}
                            />
                        </Grid>
                        <TextField
                            id="outlined-multiline-static"
                            label="Review"
                            multiline
                            rows={4}
                            defaultValue={""}
                            sx={{ width: "100%" }}
                            onChange={handleChange}
                        />
                        <Grid item container justifyContent={"end"}>
                            <Button
                                variant="outlined"
                                onClick={handleClick}
                                disabled={isLoading}
                            >
                                Add Review
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};

export default AddReviewModal;
