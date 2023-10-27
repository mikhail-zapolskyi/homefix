"use client"
// Call to action card that takes props in the form of a direction (could be 'rtl'), text, button text, and an image
// Displays a call to action section

import { Typography, Avatar, Grid } from "@mui/material"
import CustomButton from "../button/CustomButton"
import { useRouter } from "next/navigation";

interface Props {
    direction?: string;
    CTAButtonText: string;
    CTAText: string;
    CTAImage?: string;
    CTALink: string;
}

const SignUpCTACard: React.FC<Props> = ({ direction, CTAButtonText, CTAText, CTAImage, CTALink }) => {
    const router = useRouter()
    const handleOnClick = (id: string) => {
        router.push(`/${id}`)
    }
    return (
        <Grid container sx={{height: '20rem', borderRadius: '2rem'}} dir={direction}>
            <Grid item container xs={12} lg={8} sx={{ maxHeight: '20rem', p: '1rem'}} justifyContent='center' alignItems='center'>
                <Grid item xs={12}>
                    <Avatar
                            src={CTAImage}
                            alt="Call to action image"
                            sx={{
                                width: 'auto',
                                height: '15rem',
                                borderRadius: '1rem'
                            }}
                            variant="square"
                    />
                </Grid>
            </Grid>
            <Grid item container xs={12} lg={4} spacing={1} sx={{ p: '1rem'}} alignContent='center' alignItems='center'>
                <Grid item container xs={12} sx={{justifyContent: 'center'}}>
                    <Typography variant="h2"> {CTAText} </Typography>
                </Grid>
                <Grid item container xs={12} sx={{justifyContent: 'center'}}>
                    <CustomButton text={CTAButtonText} variant="contained" padsize="none" width="12rem" onClick={() => handleOnClick(CTALink)}/>
                </Grid>
            </Grid>
        </Grid>
    )
    

}

export default SignUpCTACard