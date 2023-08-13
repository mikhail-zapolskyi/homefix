import { Button, styled } from "@mui/material";
import React, { ReactNode } from "react";

const StyledButton = styled(Button)(({ theme }) => ({
    minWidth: "5rem",
    borderRadius: ".8rem",
    fontSize: "1rem",
    fontWeight: "500",
    padding: ".2rem",
    textTransform: "inherit",
    backgroundBlendMode: "soft-lighten",
}));

interface ButtonProps {
    fullWidth?: boolean;
    disabled?: boolean;
    endIcon?: ReactNode;
    startIcon?: ReactNode;
    size?: "small" | "medium" | "large";
    text: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    variant?: "contained" | "outlined" | "text";
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
        >
            {text}
        </StyledButton>
    );
};

export default CustomButton;
