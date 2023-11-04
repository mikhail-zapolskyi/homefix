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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import {
    DraftingCompass,
    MessageCircle,
    MoreVertical,
    UserMinus,
    UserPlus,
    UserX,
} from "lucide-react";
import { blue, green } from "@mui/material/colors";
import { FullContactType } from "@/app/types";
import { $Enums, ServiceProfile } from "@prisma/client";
import useDefineColorByRating from "@/hooks/useDefineColorByRating";

interface Props {
    currentUserId: string | null | undefined;
    data: FullContactType;
    userName: string | null;
    userImage: string | null;
    userType: string;
    contactDate: Date;
    request_status: $Enums.RequestStatus;
    sender: string;
    serviceProfile: ServiceProfile | null;
    onAccept: () => void;
    onDecline: () => void;
    onDelete: () => void;
    onSendMessage: () => void;
    onSendProjectRequest: () => void;
}

const DashContactCard: FC<Props> = ({
    currentUserId,
    userName,
    userImage,
    userType,
    contactDate,
    request_status,
    sender,
    serviceProfile,
    onAccept,
    onDecline,
    onDelete,
    onSendMessage,
    onSendProjectRequest,
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

    const ratingColor = useDefineColorByRating({
        number: serviceProfile?.rating || 0,
    });

    const color = {
        PENDING: blue[500],
        ACCEPTED: green[500],
    };

    return (
        <CustomDashboardCard>
            <CardHeader
                avatar={<Avatar alt={`${userName}`} src={userImage || ""} />}
                title={userName}
                subheader={moment(contactDate).format("LLL")}
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
                                        >
                                            <ListItemIcon>
                                                <UserPlus
                                                    color={
                                                        theme.palette.success
                                                            .dark
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
                                    >
                                        <ListItemIcon>
                                            <UserX
                                                color={
                                                    theme.palette.warning.main
                                                }
                                            />
                                        </ListItemIcon>
                                        Decline Request
                                    </MenuItem>
                                )}
                                {request_status === "ACCEPTED" && (
                                    <>
                                        {serviceProfile &&
                                            serviceProfile.userId !==
                                                currentUserId && (
                                                <>
                                                    <MenuItem
                                                        onClick={() => {
                                                            handleClose();
                                                            onSendMessage();
                                                        }}
                                                    >
                                                        <ListItemIcon>
                                                            <MessageCircle
                                                                color={
                                                                    theme
                                                                        .palette
                                                                        .primary
                                                                        .main
                                                                }
                                                            />
                                                        </ListItemIcon>
                                                        Send Message
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={() => {
                                                            handleClose();
                                                            onSendProjectRequest();
                                                        }}
                                                    >
                                                        <ListItemIcon>
                                                            <DraftingCompass />
                                                        </ListItemIcon>
                                                        Project Request
                                                    </MenuItem>
                                                </>
                                            )}
                                        <MenuItem
                                            onClick={() => {
                                                handleClose();
                                                onDelete();
                                            }}
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
                                    </>
                                )}
                            </Menu>
                        )}
                    </>
                }
            />
            <CardContent>
                <TableContainer>
                    <Table aria-label="customized table">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <Typography variant="body2">
                                        Type:
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="body2">
                                        {userType}
                                    </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <Typography variant="body2">
                                        Status:
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography
                                        variant="body2"
                                        color={color[request_status]}
                                    >
                                        {request_status}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            {serviceProfile && (
                                <>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="body2">
                                                Business:
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="body2">
                                                {serviceProfile.name}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="body1">
                                                Rating:
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography
                                                variant="body2"
                                                color={`${ratingColor}.main`}
                                            >
                                                {serviceProfile.rating}%
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </CustomDashboardCard>
    );
};

export default DashContactCard;
