"use client";

import React, { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";

import { signIn, signOut, useSession } from "next-auth/react";
import { CustomButton, SlideMenu } from "@/components";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import useTheme from "@mui/material/styles/useTheme";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
// ICONS
import { LogOut, LayoutDashboard, Settings } from "lucide-react";
import { Button } from "@mui/material";

const PrimaryAppBar = () => {
    const { data: session, status } = useSession();
    const segment = useSelectedLayoutSegments();
    const theme = useTheme();
    const { push } = useRouter();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        useState<null | HTMLElement>(null);
    const [slideMenuState, setSlideMenuState] = useState(false);

    const handleslideMenuOpen = () => {
        setSlideMenuState(true);
    };

    const handleslideMenuClose = () => {
        setSlideMenuState(false);
    };

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={isMenuOpen}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            elevation={2}
            sx={{ ".MuiPaper-root": { borderRadius: "1rem" } }}
        >
            <MenuItem
                onClick={() => {
                    handleMenuClose();
                    push("/dashboard");
                }}
            >
                <ListItemIcon>
                    <LayoutDashboard />
                </ListItemIcon>
                Dashboard
            </MenuItem>
            <Divider />
            <MenuItem
                onClick={() => {
                    handleMenuClose();
                    push("/settings");
                }}
            >
                <ListItemIcon>
                    <Settings />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem
                onClick={() => {
                    signOut({ callbackUrl: "/" });
                    handleMenuClose();
                }}
            >
                <ListItemIcon>
                    <LogOut />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );

    const renderAuthButtons = (
        <Grid container columnSpacing={1}>
            <Grid item>
                <CustomButton
                    text="Sign In"
                    onClick={() => signIn()}
                    variant="contained"
                />
            </Grid>
            <Grid item>
                <CustomButton
                    text="Sign Up"
                    onClick={() => {
                        push("/auth/signup");
                    }}
                />
            </Grid>
        </Grid>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            elevation={4}
            sx={{ ".MuiPaper-root": { borderRadius: "1rem" } }}
        >
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    onClick={() => push("/dashboard")}
                >
                    <Avatar
                        alt={`${session?.user.name}`}
                        src={`${session?.user.image}`}
                        sx={{ width: 25, height: 25 }}
                    />
                </IconButton>
                <Typography variant="body1">{session?.user.name}</Typography>
            </MenuItem>
            <MenuItem
                onClick={() => {
                    push("/dashboard");
                    handleMobileMenuClose();
                }}
            >
                <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                >
                    <DashboardIcon sx={{ width: 30, height: 30 }} />
                </IconButton>
                <p>Dashboard</p>
            </MenuItem>
            <MenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Sign Out</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                elevation={1}
                sx={{
                    boxShadow: 1,
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                }}
            >
                <Toolbar>
                    {status === "authenticated" &&
                        "/dashboard" === `/${segment[0]}` && (
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2 }}
                                onClick={handleslideMenuOpen}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            display: {
                                sm: "block",
                                cursor: "pointer",
                            },
                        }}
                        onClick={() => {
                            push("/");
                        }}
                    >
                        HomeFix
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                md: "flex",
                                alignItems: "center",
                            },
                        }}
                    >
                        {status === "authenticated" ? (
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                                disableRipple={true}
                            >
                                <Avatar
                                    alt={`${session?.user.name}`}
                                    src={`${session?.user.image}`}
                                    sx={{ width: 30, height: 30 }}
                                />
                                <Typography
                                    sx={{
                                        padding: ".5rem",
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    {session?.user.name}
                                </Typography>
                            </IconButton>
                        ) : (
                            renderAuthButtons
                        )}
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        {status === "authenticated" ? (
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        ) : (
                            renderAuthButtons
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <SlideMenu
                slideMenuState={slideMenuState}
                handleslideMenuClose={handleslideMenuClose}
            />
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
};

export default PrimaryAppBar;
