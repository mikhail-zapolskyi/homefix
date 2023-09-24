import { Typography, Box, Grid, Paper } from "@mui/material";
import React from "react";


export const ExploreSection = () => {
    return (
        <Grid container sx={{minHeight: '25rem', justifyContent: 'center', gridGap: '1rem', py: '2rem', bgcolor: 'background.default'}}>
                <Grid item xs={12} sx={{justifyContent: 'center', alignContent: 'center'}}>
                    <Typography variant="h3" sx={{}}>Top Performers 🔥</Typography>
                </Grid>
                <Grid item xs={2} sx={{ borderRadius: '1rem', maxHeight: '15rem'}}>
                    {/* Card content */}
                    <Typography>
                        Sample Text
                    </Typography>
                </Grid>
                <Grid item xs={2} sx={{ borderRadius: '1rem', maxHeight: '15rem'}}>
                    {/* Card content */}
                    <Typography>
                        Sample Text
                    </Typography>
                </Grid>
                <Grid item xs={2} sx={{ borderRadius: '1rem', maxHeight: '15rem', bgcolor: 'grey'}}>
                    {/* Card content */}
                    <Typography>
                        Sample Text
                    </Typography>
                </Grid>
        </Grid>
    )
}

export default ExploreSection