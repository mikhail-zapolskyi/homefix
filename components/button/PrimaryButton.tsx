import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import MuiButton from "@mui/material/Button";

interface IPrimaryButton {
    text: string;
    onClick: () => void;
}
const StyledButton = styled(MuiButton)(({ theme }) => ({
    width: "5rem",
    marginLeft: "1rem",
    borderRadius: "1rem",
    fontSize: ".8rem",
    padding: ".2rem",
    textTransform: "inherit",
}));

const SignInButton: React.FC<IPrimaryButton> = ({ onClick, text }) => {
    return (
        <StyledButton variant="outlined" size="small" onClick={onClick}>
            {text}
        </StyledButton>
    );
};

export default SignInButton;
