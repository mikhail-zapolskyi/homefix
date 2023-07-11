"use client";

import { AppBar, Grid, IconButton, Toolbar, Typography, Divider } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";


const NavigationBar = () => {
	return (
		<>
			<AppBar position="static" sx={{ backgroundColor: 'primary.light', width: "100vw", maxWidth: "100%", height: "8vh" }}>
				<Toolbar sx={{ width: '100%' }}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								HomeFix
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
								HomeFix
							</Typography>
						</Grid>

					</Grid>
				</Toolbar>
				<Divider sx={{ width: "100%" }} />
			</AppBar>
		</>
	)

};

export default NavigationBar;
