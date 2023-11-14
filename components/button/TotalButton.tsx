// This component is a TotalButton. It's a functional component (FC),
// and it takes in props such as isActive (to track button activity),
// title (button label), number (a numerical value to display),
// color (background color for a specific part of the button),
// onClick (a callback function triggered when the button is clicked).
// Clicking the button triggers the onClick callback.

import { FC } from "react";
import { Stack, Typography } from "@mui/material";

// Define the prop types for TotalButton
type TotalButtonProps = {
    isActive: boolean;
    title: string;
    number: number;
    color: string;
    onClick: () => void;
};

const TotalButton: FC<TotalButtonProps> = ({
    isActive, // Need to track button activity to set border
    title,
    number,
    color,
    onClick,
}) => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ "&:hover": { cursor: "pointer" } }}
            paddingBottom=".5rem"
            borderBottom={`${isActive && "2px black solid"}`}
            whiteSpace="nowrap"
        >
            <Typography
                variant="body2"
                onClick={() => {
                    onClick();
                }}
            >
                {title}
            </Typography>
            <Typography
                variant="body2"
                bgcolor={color}
                padding="0 .5rem"
                borderRadius=".4rem"
                color="common.white"
            >
                {number}
            </Typography>
        </Stack>
    );
};

export default TotalButton;
