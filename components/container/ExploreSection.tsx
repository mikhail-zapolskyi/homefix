import { Typography, Box, Grid, Paper, Avatar, Container } from "@mui/material";
import React from "react";
import CustomCarousel from "../animation/Carousel";
import "react-multi-carousel/lib/styles.css";

export const ExploreSection = () => {
    return (
        <Grid container sx={{height: '20rem', mb: '15rem', width: '100%' }} justifyContent='center'>
            <Grid item container xs={12} justifyContent='center' sx={{pt: '3rem'}}>
                <Typography variant="h3" sx={{justifyContent: 'end'}}>Top Performers 🔥</Typography>
            </Grid>
            <CustomCarousel /> 
        </Grid>
    )
}

export default ExploreSection