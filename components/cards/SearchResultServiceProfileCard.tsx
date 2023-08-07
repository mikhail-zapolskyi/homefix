import React from "react";
import { Grid, Box, Typography, Divider, Avatar, Rating, Button} from "@mui/material";
import { BiStar } from "react-icons/bi";
import { CustomDashboardCard, PrimaryButton } from "..";

interface ServicesProps {
    id?: string;
    name?: string;
    city?: string;
    rating?: number;
    image?: string;
    skill?: number;
    onClick: () => void;
}

const SearchResultServiceProfileCard: React.FC<ServicesProps>= ({id, name, city, rating, image, skill, onClick}) => {
    return (
        <CustomDashboardCard >
            <Grid container>
                <Avatar 
                    src={image}
                    alt={name}
                    sx={{ width: 200, height: 200,}}
                    variant="square"
                    />
                <Grid item xs={2} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    ml: '3rem'
                }}>

                    <Typography variant="h4" sx={{
                        mb: '0.1rem',
                        mt: '1rem',
                        color: 'primary.main',
                        fontWeight: 'bold'
                    }}>
                        {name}
                    </Typography>

                    <Typography sx={{
                        mb: '1rem',
                        fontWeight: 'bold'
                    }}>
                        {city}
                    </Typography>

                    <Typography variant="h6"
                        sx={{
                            fontWeight: '500'
                    }}>
                        {/* {makeStars(service.rating)} */}
                        <Rating defaultValue={rating} readOnly/>
                    </Typography>

                    <Typography variant="subtitle1"
                        sx={{fontWeight: 'bold'}}
                    >
                        Skill Level: {skill}
                    </Typography>

                    <Box sx={{
                        mb: '1rem',
                        pt: '1rem'
                        }}>
                        <Typography>
                            Description for each
                        </Typography>
                    </Box>

                </Grid>
                <Grid item xs={1} sx={{ml: '8rem'}}>
                    <Divider orientation="vertical" sx={{ height: '100%'}}/>
                </Grid>
                <Grid item xs={2} 
                    sx={{
                        mt: {xs: '1rem', md: '1.5rem', lg: '2rem'},
                        ml: {xs: '0.5rem', md: '1rem', lg: '1.5rem'}
                    }}>
                    {/* This is in place of the company logo */}
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Avatar                     
                        alt={name}
                        sx={{ m: '1rem'}}
                        />
                        <Typography>About the fixer profile description</Typography>
                    </Box>
                    <Button onClick={onClick} sx={{    
                        marginLeft: "1rem",
                        borderRadius: "1rem",
                        fontSize: ".8rem",
                        padding: ".2rem",
                        textTransform: "inherit",
                        mt: '5rem',
                        p: '0.4rem',
                        display: {xs: 'none', lg: 'inline'},
                        width: {xs: '6rem', lg: '8rem'}
                    }}
                        variant="contained"
                        size="small"
                    >
                        View Profile 
                    </Button>
                </Grid>
            </Grid>
        </CustomDashboardCard>
        
    )
}

export default SearchResultServiceProfileCard