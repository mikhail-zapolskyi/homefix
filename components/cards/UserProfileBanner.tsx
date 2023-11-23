import { Avatar, Box, Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react'


interface Props {
  userName: string;
}

const UserProfileBanner = () => {
  return (
    <Paper sx={{ borderRadius: '2rem', height: '20rem', justifyContent: 'center' }}>
      <Box sx={{ bgcolor: 'primary.main', height: '80%', borderRadius: '2rem', display: 'flex' }}>
      </Box>
      <Box sx={{ height: '20%', display: 'flex' }} justifyContent='space-around'>
          <Box sx={{ display: 'flex', alignContent: 'flex-end', pb: '7rem', bgColor: "rgba(255, 55, 255, 10)" }} alignItems='center'>
            <Avatar sx={{ height: '7rem', width: '7rem' }} />
            <Typography variant='h1'>User Name</Typography>
          </Box>
          {/* Leave this box empty, it is for flexbox to act properly */}
          <Box>
          </Box>
      </Box>
    </Paper>
  )
}

export default UserProfileBanner