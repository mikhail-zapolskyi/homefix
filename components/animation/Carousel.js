import React from "react";
import {
    Paper,
    MobileStepper,
    Typography,
    Button,
    Box,
    Avatar,
    Grid,
} from "@mui/material";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const content = [
    {
        image: "test.jpg",
        businessName: `Darrel's Plumbing`,
    },
    {
        image: "test.jpg",
        businessName: "Bob's HomeCleaning",
    },
    {
        image: "test.jpg",
        businessName: `SuperElectrics`,
    },
    {
        image: "test.jpg",
        businessName: `John's Better Plumbing`,
    },
    {
        image: "test.jpg",
        businessName: "ExterminatorTerminator",
    },
    {
        image: "test.jpg",
        businessName: `Dishwasher Reviverz`,
    },
];

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


const CustomCarousel = () => {
    return (
        // <Grid container sx={{ position: 'absolute', width: '50%', my: '5rem' }}>
        //     <Grid item xs={12} sx={{ position: 'absolute', width: '100%' }}>
        <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsive}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >

            {
                content.map((i) => (
                    <Grid
                        key={i.id}
                        item
                        sx={{
                            borderRadius: "1rem",
                            bgcolor: "secondary.contrastText",
                            p: "1rem",
                        }}
                    >
                        <img
                            src={i.image}
                            sx={{ bgcolor: "black" }}
                            variant="square"
                            height='auto'
                            width='auto'
                        />
                        <Typography
                            sx={{ justifySelf: "end", alignSelf: "center" }}
                            variant="h3"
                        >
                            {i.businessName}
                        </Typography>
                    </Grid>
                ))
            }

        </Carousel >
        //     </Grid>
        // </Grid>

    );
};

export default CustomCarousel;
