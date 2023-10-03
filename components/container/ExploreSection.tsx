import { Typography, Box, Grid, Paper, Avatar } from "@mui/material";
import React from "react";
import CustomCarousel from "../animation/Carousel";
import "react-multi-carousel/lib/styles.css";
import { Container } from "@react-email/components";

export const ExploreSection = () => {
    return (
        <Container>
            {/* <Grid container sx={{minHeight: '10rem', justifyContent: 'center', gridGap: '1rem', py: '2rem', bgcolor: 'background.default'}}>
                    <Grid item container xs={12} justifyContent='center'>
                        <Typography variant="h3" sx={{justifyContent: 'end'}}>Top Performers 🔥</Typography>
                    </Grid>
            </Grid> */}
            <CustomCarousel /> 
        </Container>
    )
}

export default ExploreSection