"use client";
import { Paper, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SearchCard, TextAnimation } from "@/components";
import { useEffect, useState } from "react";

const StyledWrapper = styled(Paper)(({ theme }) => ({
    padding: "2rem",
    [theme.breakpoints.up("sm")]: {
        left: "5rem",
        maxWidth: "32rem",
        minWidth: "25rem",
        minHeight: "20rem",
    },
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    "@media (min-width:0px)": {
        "@media (orientation: landscape)": {
            marginTop: "2rem",
            position: "reletive",
        },
    },
    [theme.breakpoints.up("md")]: {
        top: "50%",
        left: "10%",
        transform: "translate(-10%, -50%)",
    },
    backgroundColor: "rgba(255, 255, 255, .6)",
    boxShadow: "none",
    borderRadius: "1rem",
}));

const StyledTypography = styled(Typography)(() => ({
    position: "relative",
}));

export const ProductHeroMainCard = () => {
    const [wordIndex, setWordIndex] = useState(0);
    const service = ["plumbing", "cleaning", "painting", "flooring"];

    const changeWordIndex = () => {
        setWordIndex((prevIndex) => (prevIndex + 1) % service.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            changeWordIndex();
        }, 6000);
        return () => clearInterval(interval);
    }, [wordIndex]);

    return (
        <StyledWrapper>
            <Box sx={{ marginBottom: "1rem" }}>
                <StyledTypography variant="h1">
                    Home <TextAnimation text={service[wordIndex]} />,
                    <br />
                    just easy.
                </StyledTypography>
            </Box>
            <SearchCard />
        </StyledWrapper>
    );
};

export default ProductHeroMainCard;
