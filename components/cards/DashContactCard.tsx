"use client";

import React, { FC } from "react";
import { CustomDashboardCard } from "@/components";
import {
    Avatar,
    CardContent,
    CardHeader,
    Fade,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import { MoreVertical, UserMinus, UserPlus, UserX } from "lucide-react";

interface Props {
    currentUserId: string | null | undefined;
    userName: string;
    userImage: string;
    userType: string;
    contactData: string;
    request_status: string;
    sender: string;
    serviceProfile: Record<string, any>;
    onAccept: () => void;
    onDecline: () => void;
    onDelete: () => void;
}

const DashContactCard: FC<Props> = ({
    currentUserId,
    userName,
    userImage,
    userType,
    contactData,
    request_status,
    sender,
    serviceProfile,
    onAccept,
    onDecline,
    onDelete,
}) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <CustomDashboardCard>
            <>
                <CardHeader
                    avatar={<Avatar alt={userName} src={userImage} />}
                    title={userName}
                    subheader={moment(contactData).format("ll")}
                    action={
                        <>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? "long-menu" : undefined}
                                aria-expanded={open ? "true" : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MoreVertical />
                            </IconButton>
                            {open && (
                                <Menu
                                    id="fade-menu"
                                    MenuListProps={{
                                        "aria-labelledby": "fade-button",
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                    transformOrigin={{
                                        horizontal: "right",
                                        vertical: "top",
                                    }}
                                    anchorOrigin={{
                                        horizontal: "right",
                                        vertical: "bottom",
                                    }}
                                    elevation={2}
                                    sx={{
                                        ".MuiPaper-root": {
                                            borderRadius: "1rem",
                                        },
                                    }}
                                >
                                    {request_status === "PENDING" &&
                                        sender !== currentUserId && (
                                            <MenuItem
                                                onClick={() => {
                                                    handleClose();
                                                    onAccept();
                                                }}
                                                sx={{
                                                    color: "success.dark",
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <UserPlus
                                                        color={
                                                            theme.palette
                                                                .success.dark
                                                        }
                                                    />
                                                </ListItemIcon>
                                                Accept Request
                                            </MenuItem>
                                        )}
                                    {request_status === "PENDING" && (
                                        <MenuItem
                                            onClick={() => {
                                                handleClose();
                                                onDecline();
                                            }}
                                            sx={{ color: "warning.main" }}
                                        >
                                            <ListItemIcon>
                                                <UserX
                                                    color={
                                                        theme.palette.warning
                                                            .main
                                                    }
                                                />
                                            </ListItemIcon>
                                            Decline Request
                                        </MenuItem>
                                    )}
                                    {request_status === "ACCEPTED" && (
                                        <MenuItem
                                            onClick={() => {
                                                handleClose();
                                                onDelete();
                                            }}
                                            sx={{ color: "error.main" }}
                                        >
                                            <ListItemIcon>
                                                <UserMinus
                                                    color={
                                                        theme.palette.error.main
                                                    }
                                                />
                                            </ListItemIcon>
                                            Delete Contact
                                        </MenuItem>
                                    )}
                                </Menu>
                            )}
                        </>
                    }
                />
                <CardContent>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        flexWrap="wrap"
                    >
                        <Typography variant="body1">User Type:</Typography>
                        <Typography variant="body2">{userType}</Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        flexWrap="wrap"
                    >
                        <Typography variant="body1">Contact Status:</Typography>
                        <Typography
                            variant="body2"
                            color={
                                request_status === "PENDING"
                                    ? "info.main"
                                    : "success.dark"
                            }
                        >
                            {request_status}
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        flexWrap="wrap"
                    >
                        <Typography variant="body1">Service Name:</Typography>
                        <Typography variant="body2">
                            {serviceProfile ? serviceProfile.name : "N/A"}
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        flexWrap="wrap"
                    >
                        <Typography variant="body1">
                            Service Rating:{" "}
                        </Typography>
                        <Typography variant="body2">
                            {serviceProfile ? serviceProfile.rating : "N/A"}
                        </Typography>
                    </Stack>
                </CardContent>
            </>
        </CustomDashboardCard>
    );
};

export default DashContactCard;
