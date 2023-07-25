"use client";
import { styled, Paper, Typography, Box, Container } from "@mui/material";
import { SearchInput, TextAnimation } from "@/components";
import { useEffect, useState } from "react";

const StyledWrapper = styled(Paper)(({ theme }) => ({
    position: "absolute",
    padding: "2rem",
    [theme.breakpoints.up("sm")]: {
        left: "5rem",
    },
    backgroundColor: "rgba(255, 255, 255, .6)",
    boxShadow: "none",
}));

const StyledTypography = styled(Typography)(() => ({
    position: "relative",
}));

export const ProductHeroMainCard = () => {
    const [wordIndex, setWordIndex] = useState(0);
    const service = ["repair", "inspection", "improvement", "cleaning"];

    const changeWords = () => {
        setWordIndex((prevIndex) => (prevIndex + 1) % service.length);
    };
    const time = parseInt(service[wordIndex].length + "000");

    useEffect(() => {
        const interval = setInterval(() => [changeWords()], time);

        () => clearInterval(interval);
    }, []);
    return (
        <StyledWrapper>
            <div>
                <StyledTypography variant="h1">
                    Home <TextAnimation text={service[wordIndex]} />,
                    <br />
                    made easy.
                </StyledTypography>
            </div>
            <Box sx={{ display: "flex" }}>
                <Typography
                    variant="h5"
                    color="primary.main"
                    sx={{ padding: "0 1rem" }}
                >
                    Find a Pro
                </Typography>
                <Typography
                    variant="h5"
                    color="primary.main"
                    sx={{ padding: "0 1rem" }}
                >
                    Find a Customer
                </Typography>
            </Box>
            <SearchInput />
            <Typography variant="body2" color="secondary.main">
                Try to find a pros, <strong>plumber</strong>,{" "}
                <strong>electrician</strong>
            </Typography>
        </StyledWrapper>
    );
};

export default ProductHeroMainCard;
