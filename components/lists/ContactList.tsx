"use client";
import { ReactNode, FC } from "react";
import { List } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
    children: ReactNode;
    fullLength?: boolean;
}

const StyledList = styled(List)(({ theme }) => ({
    width: "100%",
    minHeight: "3rem",
    padding: "1rem",
    position: "relative",
    boxShadow: `${theme.shadows[4]}`,

    overflowY: "auto",
    maxHeight: "8rem",

    [theme.breakpoints.up("sm")]: {
        borderRadius: "1rem",
    },

    [theme.breakpoints.up("md")]: {
        height: "auto",
        maxHeight: "none",
    },
}));

const ContactList: FC<Props> = ({ children }) => {
    return <StyledList>{children}</StyledList>;
};

export default ContactList;
