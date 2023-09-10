
import React from "react";
import { Grid, Box, Typography, Divider, Avatar, Rating, Button } from "@mui/material";
import { BiStar } from "react-icons/bi";
import { CustomButton, CustomDashboardCard, Loader } from "..";
import determineFixerSkillLevel from "@/utils/helpers/determineFixerSkillLevel";

interface ServicesProps {
    data?: Record<string, any>
    onClick: () => void;
}

const ViewSearchServiceProfile: React.FC<ServicesProps> = ({ data, onClick }) => {
    return (
        data ?
            <CustomDashboardCard >
                <Grid container spacing={1} sx={{ alignItems: 'center' }}>
                    <Grid container item xs={2} sx={{ display: { xs: 'none', md: 'inherit' }, justifyContent: 'center' }} >
                        <Avatar
                            src={data.service.image}
                            alt={data.service.name}
                            sx={{ height: 150, width: 150, borderRadius: '0.8rem' }}
                            variant="square"
                        />
                    </Grid>

                    <Grid container item xs={12} md={5} spacing={2} sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <Grid item lg={12} sx={{ display: { xs: 'none', lg: 'inherit' } }}>
                            <Typography
                                variant="h6"
                            >
                                {data.service.name}
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} spacing={2}>
                            <Grid item xs={2} sx={{ display: { md: 'none' } }}>
                                <Avatar
                                    src={data.service.image}
                                    alt={data.service.name}
                                    sx={{ width: 30, height: 30, borderRadius: '0.5rem' }}
                                    variant="square"
                                />
                            </Grid>

                            <Grid item xs={5} lg={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'end', md: 'start' } }}>
                                <Typography variant="body2" sx={{ mr: '0.3rem' }}>
                                    {data.service.rating}
                                </Typography>
                                <Rating
                                    defaultValue={data.service.rating}
                                    size="small"
                                    readOnly
                                />
                            </Grid>

                            <Grid item xs={5} lg={4} sx={{ alignItems: 'center', display: 'flex', justifyContent: { xs: 'end', md: 'start' } }}>
                                <Typography
                                    sx={{
                                        fontWeight: 'bold',
                                        fontSize: { xs: '14px', lg: '15px' },
                                        "&:before": {
                                            content: '"none"',
                                            lg: {
                                                content: '"Skill Level: "'
                                            }
                                        }
                                    }}
                                >
                                    {determineFixerSkillLevel(data.service.experience)}
                                </Typography>
                            </Grid>
                            <Grid item lg={4} sx={{ display: 'none' }}>
                                <Typography sx={{
                                    fontWeight: 'bold',
                                    fontSize: { xs: '14px', lg: '15px' },
                                    display: { xs: 'none', lg: 'inherit' }
                                }}>
                                    {data.service.city}
                                </Typography>
                            </Grid>
                        </Grid>




                        <Grid item xs={12} sx={{ display: { lg: 'none' } }}>
                            <Typography sx={{
                                fontSize: { xs: '1rem', lg: '2rem' },
                                color: 'primary.main',
                                fontWeight: 'bold',
                                width: { xs: '100%', lg: '10rem' },

                            }}>
                                {data.service.name}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}
                            sx={{
                                mb: { lg: '1rem' },
                                pt: { lg: '1rem' },
                            }}>
                            <Typography
                                sx={{
                                    width: '100%',
                                    fontSize: { xs: '0.8rem', lg: 'body1' },
                                }}
                            >
                                {data.service.introduction}
                            </Typography>
                        </Grid>

                    </Grid>

                    {/*Everything below is invisible inside mobile */}

                    <Grid container item xs={3}
                        spacing={2}
                        sx={{
                            display: { xs: 'none', lg: 'inherit' },
                            justifyContent: 'end',
                            width: '100%',
                            alignItems: 'center',
                        }}>
                        <Grid item xs={1}>
                            <Divider orientation="vertical" sx={{ height: '10rem' }} />
                        </Grid>
                        {/* This is in place of the company logo */}
                        <Grid container item xs={10} spacing={2}>
                            <Grid item sx={{ display: 'flex', flexDirection: 'row', m: "0", ml: '1rem' }}>
                                <Avatar
                                    alt={data.name}
                                    src={data.image}
                                    sx={{ mr: '1rem', mt: '0.3rem' }}
                                />
                                <Grid item sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography fontWeight='700'>{data.name}</Typography>
                                    <Typography>{data.service.bio}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ ml: '1rem', }}>
                                <CustomButton
                                    onClick={onClick}
                                    text="View Profile"
                                    variant="contained"
                                    size="small"
                                    padsize="small"
                                />
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </CustomDashboardCard>
            :
            <Box>
                <Typography> Nothing found </Typography>
            </Box>
    )
}

export default ViewSearchServiceProfile


