"use client";
import { ReactNode, FC } from "react";
import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
    children: ReactNode;
    fullLength?: boolean;
}

const StyledDiv = styled("div")(({ theme }) => ({
    width: "100%",
    padding: "1rem",
    boxShadow: `${theme.shadows[4]}`,
    height: "100%",
    overflowY: "auto",
    position: "relative",

    [theme.breakpoints.up("sm")]: {
        borderRadius: "1rem",
    },
}));

const StyledList = styled(Stack)(({ theme }) => ({
    height: "90%",
    overflowY: "auto",

    "&::-webkit-scrollbar": {
        display: "none",
    },
}));

const MessageList: FC<Props> = ({ children }) => {
    return (
        <StyledDiv>
            <StyledList spacing={1}>{children}</StyledList>
        </StyledDiv>
    );
};

export default MessageList;
