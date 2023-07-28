import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

interface SecondaryButtonProps {
    text: string;
    type?: "text" | "contained" | "outlined";
    size?: "small" | "large" | "medium";
    onClick?: () => void;
}

const StyledButton = styled(Button)(({ theme }) => ({
    width: "10rem",
    marginLeft: 0,
    borderRadius: 0,
    borderBottomRightRadius: ".5rem",
    borderTopRightRadius: ".5rem",
    fontSize: "1.3rem",
    padding: ".6rem",
    textTransform: "inherit",
}));

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
    onClick,
    text,
    type,
    size,
}) => {
    const variantString = type || "contained";
    const sizeString = size || "small";

    return (
        <StyledButton
            variant={variantString}
            size={sizeString}
            onClick={onClick}
            type="submit"
        >
            {text}
        </StyledButton>
    );
};

export default SecondaryButton;
