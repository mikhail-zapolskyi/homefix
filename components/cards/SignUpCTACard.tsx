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
    CTAImage: string;
    CTALink: string;
}

const SignUpCTACard: React.FC<Props> = ({ direction, CTAButtonText, CTAText, CTAImage, CTALink }) => {
    const router = useRouter()
    const handleOnClick = (id: string) => {
        router.push(`/${id}`)
    }
    return (
        <Grid container spacing={3} sx={{width: '100%', height: '20rem', borderRadius: '2rem'}} dir={direction}>
            <Grid item xs={8} sx={{justifyItems: 'end', maxHeight: '20rem'}}>
                <Avatar
                        src={CTAImage}
                        alt="Call to action image"
                        sx={{
                            width: 'auto',
                            height: '100%',
                            borderRadius: '1rem'
                        }}
                        variant="square"
                />
            </Grid>
            <Grid item container xs={4} spacing={1} sx={{alignContent: 'center'}}>
                <Grid item container xs={12} sx={{justifyContent: 'center'}}>
                    <Typography variant="h2"> {CTAText} </Typography>
                </Grid>
                <Grid item container xs={12} sx={{justifyContent: 'center'}}>
                    <CustomButton text={CTAButtonText} variant="contained" padsize="small" onClick={() => handleOnClick(CTALink)}/>
                </Grid>
            </Grid>
        </Grid>
    )
    

}

export default SignUpCTACard