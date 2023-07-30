"use client";
import { styled, Paper, Typography, Box } from "@mui/material";
import { SearchCard, TextAnimation } from "@/components";
import { useEffect, useState } from "react";

const StyledWrapper = styled(Paper)(({ theme }) => ({
    maxWidth: "32rem",
    minWidth: "25rem",
    minHeight: "25rem",
    padding: "2rem",
    [theme.breakpoints.up("sm")]: {
        left: "5rem",
    },
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    [theme.breakpoints.up("sm")]: {
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
