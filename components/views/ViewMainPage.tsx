"use client";
import { styled } from "@mui/material/styles";
import React from "react";
import { ProductHeroMainCard, SectionWithTitle, CustomCarousel, CarouselPostItem, PageContainer } from "@/components";
import heroImage from "@/assets/hero.webp";
import { Stack, Typography, Box } from "@mui/material";

const Image = styled("img")(({}) => ({
    width: "100%",
    height: "100%",
    objectFit: "cover",
}));

const content = [
    {
        id: '1',
        image: "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600,892&ssl=1",
        businessName: `Darrel's Plumbing`,
        date: `MM/DD/YY`,

    },
    {
        id: '2',
        image: "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600,892&ssl=1",
        businessName: "Bob's HomeCleaning",
        date: `MM/DD/YY`,
    },
    {
        id: '3',
        image: "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600,892&ssl=1",
        businessName: `SuperElectrics`,
        date: `MM/DD/YY`,
    },
    {
        id: '4',
        image: "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600,892&ssl=1",
        businessName: `John's Better Plumbing`,
        date: `MM/DD/YY`,
    },
    {
        id: '5',
        image: "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600,892&ssl=1",
        businessName: "ExterminatorTerminator",
        date: `MM/DD/YY`,
    },
    {
        id: '6',
        image: "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600,892&ssl=1",
        businessName: `Dishwasher Reviverz`,
        date: `MM/DD/YY`,
    },
    {
        id: '7',
        image: "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600,892&ssl=1",
        businessName: `Dishwasher Reviverz`,
        date: `MM/DD/YY`,
    },
    {
        id: '8',
        image: "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600,892&ssl=1",
        businessName: `Dishwasher Reviverz`,
        date: `MM/DD/YY`,
    },
];

export const ViewMainPage = () => {
    return (
        <>
            <PageContainer>
                <Image src={heroImage.src} alt="hero-image" />
                <ProductHeroMainCard />
            </PageContainer>
            <Stack sx={{ width: { md: "70%" }, py: { xs: "2rem" }, mx: "auto", justifyContent: 'center' }}>
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
