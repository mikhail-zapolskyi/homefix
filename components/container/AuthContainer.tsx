import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAuthBox = styled(Box)(({ theme }) => ({
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "1rem",
    borderRadius: ".8rem",
    [theme.breakpoints.up("sm")]: {
        boxShadow: `${theme.shadows[4]}`,
        backgroundColor: `${theme.palette.common.white}`,
    },
}));

import React, { ReactNode } from "react";

const AuthContainer = ({ children }: { children: ReactNode }) => {
    return <StyledAuthBox>{children}</StyledAuthBox>;
};

export default AuthContainer;
