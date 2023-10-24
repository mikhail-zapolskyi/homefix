"use client";
import { styled } from "@mui/material/styles";
import React from "react";
import { ProductHeroMainCard, SectionWithTitle, CustomCarousel, CarouselPostItem, PageContainer } from "@/components";
import heroImage from "@/assets/hero.webp";
import { Stack, Typography, Box } from "@mui/material";
import { FullPost } from "@/app/types";

const Image = styled("img")(({}) => ({
    width: "100%",
    height: "100%",
    objectFit: "cover",
}));


const content: FullPost[]  = [
    {
        id: '10239127',
        image: "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600,892&ssl=1",
        createdAt: new Date(),
        title: 'Simple Post Title',
        content: 'This should be a basic summary of the post, 1 to 2 sentences max. Should tell the reader more about the post.',
        serviceProfile: {
            id: '1',
            name: 'Darrel Plumbing'
        }
    },
];

export const ViewMainPage = () => {
    return (
        <>
            <PageContainer>
                <Image src={heroImage.src} alt="hero-image" />
                <ProductHeroMainCard />
            </PageContainer>
            <Stack sx={{ width: { md: "80%", lg: '70%'}, py: { xs: "2rem" }, mx: "auto", justifyContent: 'center', p: '1rem' }}>
                <SectionWithTitle title="Recent Posts">
                    <CustomCarousel>
                        {content.map((obj) => (
                            <CarouselPostItem data={obj} key={obj.id}/>
                        ))}
                    </CustomCarousel>
                </SectionWithTitle>
            </Stack>
        </>
    );
};

export default ViewMainPage;
