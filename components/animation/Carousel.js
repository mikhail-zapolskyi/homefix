import React from "react";
import { useTheme } from "@mui/material/styles";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material/";
import {
    Paper,
    MobileStepper,
    Typography,
    Button,
    Box,
    Avatar,
    Grid,
} from "@mui/material";

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

const Carousel = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxContent = content.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Grid
            container
            sx={{
                minHeight: "25rem",
                justifyContent: "center",
                gridGap: "1rem",
                py: "2rem",
                bgcolor: "background.default",
            }}
        >
            {content.map((i) => (
                <Grid
                    item
                    xs={2}
                    sx={{
                        borderRadius: "1rem",
                        maxHeight: "15rem",
                        bgcolor: "secondary.contrastText",
                        p: "1rem",
                    }}
                >
                    {/* Card content */}
                    <Avatar
                        sx={{ bgcolor: "black", width: "100%", height: "85%" }}
                        variant="square"
                    >
                        {i.image}
                    </Avatar>
                    <Typography
                        sx={{ justifySelf: "end", alignSelf: "center" }}
                    >
                        {i.businessName}
                    </Typography>
                </Grid>
            ))}

            <Grid item xs={7}>
                <MobileStepper
                    variant="text"
                    steps={maxContent / 2}
                    position="static"
                    activeStep={activeStep / 2}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxContent - 1}
                        >
                            {theme.direction === "rtl" ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button
                            size="small"
                            onClick={handleBack}
                            disabled={activeStep === 0}
                        >
                            {theme.direction === "rtl" ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                        </Button>
                    }
                />
            </Grid>
        </Grid>
    );
};

export default Carousel;
