"use client";
import { styled } from "@mui/material/styles";
import React from "react";
import { PageContainer, ProductHeroMainCard } from "@/components";
import heroImage from "@/assets/hero.webp";

const Image = styled("img")(({}) => ({
    width: "100%",
    height: "100%",
    objectFit: "cover",
}));

export const ViewMainPage = () => {
    return (
        <PageContainer>
            <Image src={heroImage.src} alt="hero-image" />
            <ProductHeroMainCard />
        </PageContainer>
    );
};

export default ViewMainPage;
