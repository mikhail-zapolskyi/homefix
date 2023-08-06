import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

interface IPrimaryButton {
    text: string;
    onClick: () => void;
}
const StyledButton = styled(Button)(({ theme }) => ({
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

export const ViewProfileButton: React.FC<IPrimaryButton> = ({ onClick, text }) => {
    return (
        <StyledButton variant="contained" size="small" onClick={onClick} sx={{mt: '5rem', p: '0.4rem', display: {xs: 'none', lg: 'inline'}, width: {xs: '6rem', lg: '8rem'}}}>
            {text}
        </StyledButton>
    );
};

export default SignInButton;
