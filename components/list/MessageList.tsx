"use client";
import { ReactNode, FC, RefObject, useRef, useEffect } from "react";
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
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollToTheBottom = setTimeout(() => {
            const scrollEl = bottomRef.current;
            scrollEl?.scroll({
                top: scrollEl?.scrollHeight,
                behavior: "smooth",
            });
        }, 100);

        return () => clearTimeout(scrollToTheBottom);
    }, [children, bottomRef]);

    return (
        <StyledDiv>
            <StyledList spacing={1} ref={bottomRef}>
                {children}
            </StyledList>
        </StyledDiv>
    );
};

export default MessageList;
