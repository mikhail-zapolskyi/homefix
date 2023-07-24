"use client";
import { styled, Paper, Typography } from "@mui/material";
import { TextAnimation } from "@/components";
import { useEffect, useState } from "react";

const StyledWrapper = styled(Paper)(({ theme }) => ({
    position: "absolute",
    padding: "2rem",
    [theme.breakpoints.up("sm")]: {
        left: "5rem",
    },
    background: "none",
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
            <StyledTypography variant="h1">
                Home <TextAnimation text={service[wordIndex]} />
                <br />
                made easy.
            </StyledTypography>
        </StyledWrapper>
    );
};

export default ProductHeroMainCard;
