import React from "react";
import { Grid, Box, Typography, Divider, Avatar, Rating, Button} from "@mui/material";
import { BiStar } from "react-icons/bi";
import { CustomDashboardCard, PrimaryButton } from "..";
import { determineFixerSkillLevel } from "@/utils"; 

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
    const skillLevel = determineFixerSkillLevel(skill)
    return (
        <CustomDashboardCard >
            <Grid container sx={{maxWidth: '100%', mb: {xs: '-0.5rem', lg: 0}, alignItems: 'center'}}>
                <Grid item lg={2} >
                    <Avatar 
                        src={image}
                        alt={name}
                        sx={{ display: {xs: 'none', lg: 'inline'}, width: {xs: 30, lg: '100%'}, height: {xs: 30, lg: "100%"}, mr: '3rem'}}
                        variant="square"
                        />
                </Grid>
                
                <Grid container spacing={2} sx={{
                    display: 'flex',
                    flexDirection: {xs: 'row', lg: 'column'},
                    ml: {xs: '1rem', lg: '6rem'},
                    width: {xs: '12rem', lg: '31rem'}
                }}>
                    <Grid item lg={6} sx={{display: {xs: 'none', lg: 'inline'}}}>
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
                    <Grid item xs={2} sx={{display: {lg: 'none'}}}>
                        <Avatar
                            src={image}
                            alt={name}
                            sx={{ width: 30, height: 40, ml: '-4rem', pb: {xs: '1.1rem'}, mb: '-1rem'}}
                            variant="square"
                        />
                    </Grid>
                    <Grid item xs={2} lg={6}>
                        <Rating sx={{ml: {xs: '-2rem', lg: '-3.5rem'}}} defaultValue={rating} size="small" readOnly/>
                    </Grid>

                    <Grid item xs={4} lg={6} sx={{}}>
                        <Typography 
                            sx={{ 
                                ml: {xs: '3rem', lg: '4rem'},
                                fontWeight: 'bold',
                                fontSize:{xs: '14px', lg: '15px'},
                                width: '100rem',
                                mb: {xs: '-3rem', lg: 0},
                                mt: {lg: '-2.5rem'}
                            }}
                        >
                            Skill Level: {skill} years
                            
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{display: {lg: 'none'}}} container>
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

                    <Grid item lg={12} 
                        sx={{
                        mb: {lg: '1rem'},
                        pt: {lg: '1rem'},
                        ml: '-4rem',
                        mt: {xs: '-1rem', lg: 0},
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
                <Divider orientation="vertical" sx={{ height: '20rem', display: {xs: 'none', lg: 'inline'}}}/>
                <Grid container xs={2} lg={3} 
                    sx={{
                        display: {xs: 'none', lg: 'inline'},
                        mt: {xs: '1rem', md: '1.5rem', lg: '2rem'},
                        ml: {xs: '0.5rem', md: '1rem', lg: '2.6rem'}
                    }}>
                    {/* This is in place of the company logo */}
                    <Grid item lg={3}>
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
            </Grid>
        </CustomDashboardCard>
        
    )
}

export default SearchResultServiceProfileCard