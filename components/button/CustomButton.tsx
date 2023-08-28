import { Button, styled } from "@mui/material";
import React, { MouseEvent, ReactNode } from "react";

const StyledButton = styled(Button)(({ theme }) => ({
    minWidth: "5rem",
    borderRadius: ".8rem",
    fontSize: "1rem",
    fontWeight: "500",
    padding: ".2rem",
    textTransform: "inherit",
    backgroundBlendMode: "lighten",
}));

interface ButtonProps {
    fullWidth?: boolean;
    disabled?: boolean;
    endIcon?: ReactNode;
    startIcon?: ReactNode;
    size?: "small" | "medium" | "large";
    text: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset" | undefined;
    variant?: "contained" | "outlined" | "text";
    color?:
        | "inherit"
        | "primary"
        | "secondary"
        | "success"
        | "error"
        | "info"
        | "warning";
}

const CustomButton: React.FC<ButtonProps> = ({
    onClick,
    text = "Click",
    fullWidth = false,
    disabled,
    startIcon,
    endIcon,
    size = "small",
    type,
    variant = "outlined",
    color = "primary",
}) => {
    return (
        <StyledButton
            variant={variant}
            onClick={onClick}
            fullWidth={fullWidth}
            disabled={disabled}
            endIcon={endIcon}
            startIcon={startIcon}
            size={size}
            type={type}
            color={color}
        >
            {text}
        </StyledButton>
    );
};

export default CustomButton;
