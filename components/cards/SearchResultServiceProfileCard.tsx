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
            <Grid container sx={{maxWidth: '100%', mb: {xs: '-0.5rem', lg: 0}, alignItems: 'center'}}>
                <Grid item xs={1} lg={3}>
                    <Avatar 
                        src={image}
                        alt={name}
                        sx={{ display: {xs: 'none', lg: 'inline'}, width: {xs: 30, lg: 200}, height: {xs: 30, lg: 200},}}
                        variant="square"
                        />
                </Grid>
                
                <Grid container spacing={2} sx={{
                    display: 'flex',
                    flexDirection: {xs: 'row', lg: 'column'},
                    ml: {xs: '1rem', lg: '3rem'},
                    width: {xs: '12rem', lg: '30rem'}
                }}>
                    <Grid item xs={2}>
                        <Avatar
                            src={image}
                            alt={name}
                            sx={{ width: 30, height: 30, ml: '-4rem'}}
                            variant="square"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Rating sx={{ml: '-2rem'}} defaultValue={rating} size="small" readOnly/>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography 
                            sx={{ ml: '3rem', fontWeight: 'bold', fontSize:{xs: '12px', lg: '22px'}, width: '100rem'}}
                        >
                            Skill Level: {skill} years
                        </Typography>
                    </Grid>
                    <Grid item xs={12} container>
                        <Typography sx={{
                            fontSize: {xs: '1rem', lg: '2rem'},
                            mb: {lg: '0.1rem'},
                            mt: {lg: '1rem'},
                            ml: '-4rem',
                            color: 'primary.main',
                            fontWeight: 'bold',
                            width: {xs: '5rem', lg: '10rem'},
                        }}>
                            {name}
                        </Typography>
                    </Grid>

                    <Grid item sx={{
                        mb: {lg: '1rem'},
                        pt: {lg: '1rem'},
                        ml: '-4rem',
                        mt: {xs: '-1rem', lg: '0'},
                        width: { lg: '30rem'}
                        }}>
                        <Typography
                            sx={{         
                                width: '100%',               
                                fontSize: {xs: '0.8rem', lg: '1rem'},}}
                        >
                            {serviceDescription}
                        </Typography>
                    </Grid>

                </Grid>
                <Grid item xs={1} sx={{ml: '8rem', display: {xs: 'none', lg: 'inline'}}}>
                    <Divider orientation="vertical" sx={{ height: '10rem', display: {xs: 'none', lg: 'inline'}}}/>
                </Grid>
                <Grid item xs={2} 
                    sx={{
                        display: {xs: 'none', lg: 'inline'},
                        mt: {xs: '1rem', md: '1.5rem', lg: '2rem'},
                        ml: {xs: '0.5rem', md: '1rem', lg: '1.5rem'}
                    }}>
                    {/* This is in place of the company logo */}
                    <Box sx={{display: { lg: 'flex'}, flexDirection: 'row', width: '100%', maxWidth: '20rem', m: "0",}}>
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