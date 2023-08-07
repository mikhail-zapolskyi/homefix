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
    serviceDescription?: string;
    fixerImage?: string;
    fixerDescription?: string;
    onClick: () => void;
}

const SearchResultServiceProfileCard: React.FC<ServicesProps>= ({id, name, city, rating, image, skill, fixerImage, fixerDescription, serviceDescription, onClick}) => {
    return (
        <CustomDashboardCard >
            <Grid container>
                <Avatar 
                    src={image}
                    alt={name}
                    sx={{ width: {xs: 100, lg: 200}, height: {xs: 100, lg: 200},}}
                    variant="square"
                    />
                <Grid item xs={3} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    ml: {xs: '1rem', lg: '3rem'},
                    width: {xs: '10rem', lg: '30rem'}
                }}>

                    <Typography variant="h4" sx={{
                        mb: '0.1rem',
                        mt: {lg: '1rem'},
                        color: 'primary.main',
                        fontWeight: 'bold',
                        width: {xs: '5rem', lg: '10rem'},
                    }}>
                        {name}
                    </Typography>

                    <Typography sx={{
                        mb: {lg: '1rem'},
                        fontWeight: 'bold'
                    }}>
                        {city}
                    </Typography>

                    <Rating defaultValue={rating} size="small" readOnly/>

                    <Typography variant="subtitle1"
                        sx={{fontWeight: 'bold', width: '100rem'}}
                    >
                        Skill Level: {skill} years
                    </Typography>

                    <Box sx={{
                        mb: '1rem',
                        pt: '1rem',
                        width: '30rem'
                        }}>
                        <Typography>
                            {serviceDescription}
                        </Typography>
                    </Box>

                </Grid>
                <Grid item xs={1} sx={{ml: '8rem'}}>
                    <Divider orientation="vertical" sx={{ height: '100%', display: {xs: 'none', lg: 'inline'}}}/>
                </Grid>
                <Grid item xs={2} 
                    sx={{
                        mt: {xs: '1rem', md: '1.5rem', lg: '2rem'},
                        ml: {xs: '0.5rem', md: '1rem', lg: '1.5rem'}
                    }}>
                    {/* This is in place of the company logo */}
                    <Box sx={{display: {xs: 'none', lg: 'flex'}, flexDirection: 'row', width: '100%', maxWidth: '20rem', m: "0",}}>
                        <Avatar                     
                        alt={name}
                        src={fixerImage}
                        sx={{ m: '1rem'}}
                        />
                        <Typography>{fixerDescription}</Typography>
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