import { Typography, Box, Grid, Paper, Avatar } from "@mui/material";
import React from "react";
import Carousel from "../animation/Carousel";


export const ExploreSection = () => {
    return (
        <Grid container sx={{minHeight: '25rem', justifyContent: 'center', gridGap: '1rem', py: '2rem', bgcolor: 'background.default'}}>
                <Grid item container xs={12} justifyContent='center'>
                    <Typography variant="h3" sx={{justifyContent: 'end', alignContent: 'center', width: '12rem'}}>Top Performers 🔥</Typography>
                </Grid>
                <Carousel />
        </Grid>
    )
}

export default ExploreSection