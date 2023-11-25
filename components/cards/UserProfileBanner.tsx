import { Avatar, Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react'
import CustomButton from '../button/CustomButton';


interface Props {
  userName: string;
}

const UserProfileBanner = () => {
  return (
    <Paper sx={{ borderRadius: '2rem', height: '20rem', justifyContent: 'center' }}>
      <Box sx={{ bgcolor: 'primary.main', height: '80%', borderRadius: '2rem', display: 'flex' }}>
      </Box>
      <Box sx={{ height: '20%', display: 'flex' }} justifyContent='space-around'>
          <Box sx={{ display: 'flex', alignContent: 'flex-end', pb: '7rem' }} alignItems='center'>
            <Avatar sx={{ height: '7rem', width: '7rem', mr: '1rem' }} />
            <Typography variant='h1' alignSelf='flex-end'>User Name</Typography>
          </Box>
          {/* Leave this box empty, it is for flexbox to act properly */}

          <Box sx={{display: 'flex'}}>
            <CustomButton text={'Test'} />
            <CustomButton text={'Test'} />
            <CustomButton text={'Test'} />
          </Box>
      </Box>
    </Paper>
  )
}

export default UserProfileBanner