"use client";

import React, { useState } from "react";
import {
    Avatar,
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    MenuItem,
    Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { signIn, signOut, useSession } from "next-auth/react";
import { PrimaryButton, SlideMenu } from "@/components";
import { useRouter } from "next/navigation";

const PrimaryAppBar = () => {
    const { data: session, status } = useSession();
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
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem
                onClick={() => {
                    signOut();
                    handleMenuClose();
                }}
            >
                SignOut
            </MenuItem>
        </Menu>
    );

    const renderAuthButtons = (
        <>
            <PrimaryButton text="Sign In" onClick={() => signIn()} />
            <PrimaryButton
                text="Sign Up"
                onClick={() => {
                    push("/auth/signup");
                }}
            />
        </>
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
        >
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                >
                    <Avatar
                        alt={`${session?.user.name}`}
                        src={`${session?.user.image}`}
                        sx={{ width: 30, height: 30 }}
                    />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            <MenuItem onClick={() => signOut()}>
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
                color="neutral"
                elevation={0}
                sx={{
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                }}
            >
                <Toolbar>
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
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            display: {
                                xs: "none",
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
                            >
                                <Avatar
                                    alt={`${session?.user.name}`}
                                    src={`${session?.user.image}`}
                                    sx={{ width: 30, height: 30 }}
                                />
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
