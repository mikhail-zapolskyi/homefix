import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAuthBox = styled(Box)(({ theme }) => ({
    height: "min-content",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingTop: "1rem",
    borderRadius: ".8rem",
    "@media (min-width:600px) and (min-height:900px)": {
        boxShadow: `${theme.shadows[4]}`,
        backgroundColor: `${theme.palette.common.white}`,
    },
}));

import React, { ReactNode } from "react";

const AuthContainer = ({ children }: { children: ReactNode }) => {
    return <StyledAuthBox>{children}</StyledAuthBox>;
};

export default AuthContainer;
