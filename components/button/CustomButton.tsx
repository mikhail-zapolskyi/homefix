"use client";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { MouseEvent, ReactNode } from "react";

interface StyledButtonProps {
    padsize: "small" | "none";
    width?: string;
}

const StyledButton = styled(Button)<StyledButtonProps>(
    ({ padsize, width }) => ({
        ...(padsize === "small" && {
            minWidth: "5rem",
            padding: "0.2rem",
        }),
        ...(width && {
            width: width,
        }),
        height: "fit-content",
        borderRadius: ".8rem",
        fontSize: "1rem",
        fontWeight: "500",
        textTransform: "inherit",
        backgroundBlendMode: "lighten",
    })
);

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
    padsize?: "small" | "none";
    width?: string;
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
    padsize = "small",
    width,
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
            padsize={padsize}
            width={width}
        >
            {text}
        </StyledButton>
    );
};

export default CustomButton;
