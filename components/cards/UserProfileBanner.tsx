import { Grid, Typography } from '@mui/material';
import React from 'react'

interface Props {
    userName: string;
}

const UserProfileBanner = () => {
  return (
    <Grid container xs={12} sx={{borderRadius: '2rem', borderColor: 'primary.main'}}>
        <Typography>Test</Typography>
    </Grid>
  )
}

export default UserProfileBanner