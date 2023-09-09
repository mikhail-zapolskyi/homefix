import { Button, styled } from "@mui/material";
import React, { MouseEvent, ReactNode } from "react";

interface StyledButtonProps {
    padding: true | false;
}

const StyledButton = styled(Button)<StyledButtonProps>(({ padding }) => ({
    minWidth: "5rem",
    height: "fit-content",
    borderRadius: ".8rem",
    fontSize: "1rem",
    fontWeight: "500",
    padding: padding ? "0.2rem" : 0,
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
    padding?: true | false;
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
    padding = true,
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
            padding={padding}
        >
            {text}
        </StyledButton>
    );
};

export default CustomButton;
