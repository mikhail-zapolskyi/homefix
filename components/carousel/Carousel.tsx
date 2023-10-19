"use client"
import React from "react";
import {
    Paper,
    MobileStepper,
    Typography,
    Button,
    Box,
    Avatar,
    Grid,
    Stack
} from "@mui/material";
import { styled } from '@mui/material/styles'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image'
import { ReactNode } from "react";
import { PictureAsPdf } from "@mui/icons-material";


const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 3,
        partialVisibilityGutter: 40
    },
    mobile: {
        breakpoint: {
            max: 464,
            min: 0
        },
        items: 1,
        partialVisibilityGutter: 30
    },
    tablet: {
        breakpoint: {
            max: 1024,
            min: 464
        },
        items: 2,
        partialVisibilityGutter: 30
    }
};

const StyledCarousel = styled(Carousel) (({}) => ({
    "& .react-multi-carousel-item": {
        paddingRight: '0.5rem',
        paddingLeft: '0.5rem'
    }
}))

interface Props {
    children: ReactNode;
}

const CustomCarousel: React.FC<Props> = ({ children }) => {
    return (
        <StyledCarousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            containerClass="container"
            draggable
            focusOnSelect
            infinite={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            partialVisible
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsive}
            rewind={false}
            rewindWithAnimation={false}
            shouldResetAutoplay
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >
            {children}
        </ StyledCarousel>

    );
};

export default CustomCarousel;
