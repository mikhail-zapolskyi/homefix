import { styled } from "@mui/material";
import React from "react";
import { ProductHeroMainCard } from "@/components";
import heroImage from "@/assets/hero.webp";

const HeroContainer = styled("div")(({ theme }) => ({
    position: "relative",
    display: "flex",
    width: "100vw",
    maxWidth: "100%",
    alignItems: "center",
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    maxHeight: "100%",
}));

const Image = styled("img")(({ theme }) => ({
    width: "100%",
    height: "100%",
    objectFit: "cover",
}));

export const ProductHero = () => {
    return (
        <HeroContainer>
            <Image src={heroImage.src} alt="hero-image" />
            <ProductHeroMainCard />
        </HeroContainer>
    );
};

export default ProductHero;
