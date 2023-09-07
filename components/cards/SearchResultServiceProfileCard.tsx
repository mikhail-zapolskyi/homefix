import React from "react";
import { Grid, Box, Typography, Divider, Avatar, Rating, Button} from "@mui/material";
import { BiStar } from "react-icons/bi";
import { CustomDashboardCard, PrimaryButton } from "..";
import determineFixerSkillLevel from "@/utils/helpers/determineFixerSkillLevel";

interface ServicesProps {
    id?: string;
    name?: string;
    city?: string;
    rating?: number;
    image?: string;
    experience?: number;
    serviceDescription?: string;
    fixerImage?: string;
    fixerDescription?: string;
    onClick: () => void;
}

const SearchResultServiceProfileCard: React.FC<ServicesProps>= ({id, name, city, rating, image, experience, fixerImage, fixerDescription, serviceDescription, onClick}) => {
    
    return (
        <CustomDashboardCard >
            <Grid container sx={{width: '100%', mb: {xs: '-0.5rem', lg: 0}, alignItems: 'center', height: '14rem'}}>
                <Grid item lg={2} sx={{ display: {xs: 'none', lg: 'inline'}, }} >
                    <Avatar 
                        src={image}
                        alt={name}
                        sx={{ mr: '3rem',ml: '3rem', height: 150, width: 150 }}
                        variant="square"
                        />
                </Grid>
                
                <Grid container spacing={2} sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    ml: {xs: '3rem', lg: '6rem'},
                    width: {xs: '15rem', lg: '31rem'}
                }}>
                    <Grid item lg={12} sx={{display: {xs: 'none', lg: 'inline'}}}>
                        <Typography sx={{
                            fontSize: {xs: '1rem', lg: '2rem'},
                            mt: {lg: '1rem'},
                            ml: '-4rem',
                            color: 'primary.main',
                            fontWeight: 'bold',
                            width: '100%',
                        }}>
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{display: {lg: 'none'}}}>
                        <Avatar
                            src={image}
                            alt={name}
                            sx={{ width: 30, height: 30, ml: '-4rem', pb: {xs: '1.1rem'}, mb: '-1rem'}}
                            variant="square"
                        />
                    </Grid>

                    <Grid item xs={2} lg={4}>
                        <Rating
                            sx={{ml: {xs: '-2rem', lg: '-4rem'}}}
                            defaultValue={rating}
                            size="small"
                            readOnly
                        />
                    </Grid>

                    <Grid item xs={4} lg={4} sx={{}}>
                        <Typography 
                            sx={{ 
                                ml: {xs: '3rem', lg: '-4rem'},
                                fontWeight: 'bold',
                                fontSize:{xs: '14px', lg: '15px'},
                                width: '100rem',
                                mb: {xs: '-3rem', lg: 0},
                            }}
                        >
                            Skill Level: {determineFixerSkillLevel(experience)}
                        </Typography>
                    </Grid>
                    <Grid item lg={4}> 
                        <Typography sx={{
                            fontWeight: 'bold',
                            ml:{ lg: '-4rem' }, 
                            fontSize:{xs: '14px', lg: '15px'},
                            display: {xs: 'none', lg: 'inline'}
                        }}>
                            {city}
                        </Typography>
                    </Grid>


                    <Grid item xs={12} sx={{display: {lg: 'none'}}}>
                        <Typography sx={{
                            fontSize: {xs: '1rem', lg: '2rem'},
                            mb: {lg: '0.1rem'},
                            mt: {lg: '1rem'},
                            ml: '-4rem',
                            color: 'primary.main',
                            fontWeight: 'bold',
                            width: {xs: '100%', lg: '10rem'},

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

                {/*Everything below is invisible inside mobile */}
            {/* <Grid container lg={4} > */}
                <Divider orientation="vertical" sx={{ height: '100%', display: {xs: 'none', lg: 'inline'}, pl: '10rem'}}/>
                <Grid container xs={2} lg={3} 
                    sx={{
                        display: {xs: 'none', lg: 'inline'},
                        mt: {xs: '1rem', md: '1.5rem', lg: '2rem'},
                        ml: {xs: '0.5rem', md: '1rem', lg: '2rem'},
                        width: '100%'
                    }}>
                    {/* This is in place of the company logo */}
                    <Grid item lg={3}>
                        <Grid sx={{display: { lg: 'flex'}, flexDirection: 'row', m: "0", ml: '1rem'}}>
                            <Avatar                     
                            alt={name}
                            src={fixerImage}
                            sx={{ mr: '1rem'}}
                            />
                            <Typography sx={{width: '10rem'}}>{fixerDescription}</Typography>
                        </Grid>
                        <Button onClick={onClick} sx={{    
                            marginLeft: "1rem",
                            borderRadius: "1rem",
                            fontSize: ".8rem",
                            padding: ".2rem",
                            textTransform: "inherit",
                            mt: '5rem',
                            mb: '1rem',
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
            {/* </Grid> */}
        </CustomDashboardCard>
        
    )
}

export default SearchResultServiceProfileCard