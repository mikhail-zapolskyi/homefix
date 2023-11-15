import React, { FC } from "react";
import { CustomDashboardCard } from "@/components";
import {
    CardHeader,
    Fade,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
    MoreVertical,
    MessageCircle,
    CheckCircle,
    Building2,
    XCircle,
    Star,
} from "lucide-react";
import {
    blue,
    brown,
    green,
    grey,
    orange,
    purple,
    red,
} from "@mui/material/colors";
import { $Enums } from "@prisma/client";

type Props = {
    name: string | null;
    rating?: number;
    status?: $Enums.ProjectStatus;
    onProceed?: () => void;
    onApprove?: () => void;
    onDecline?: () => void;
    onSendMessage?: () => void;
    onReview?: () => void;
};

const DashProjectServiceCard: FC<Props> = ({
    name,
    rating,
    status,
    onProceed,
    onApprove,
    onDecline,
    onSendMessage,
    onReview,
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
        <CustomDashboardCard
            bgColor={
                (status &&
                    status === "ACCEPTED" &&
                    theme.palette.success.main) ||
                ""
            }
        >
            <CardHeader
                subheader={name}
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
                                {onProceed && (
                                    <MenuItem
                                        onClick={() => {
                                            onProceed();
                                            handleClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <Building2 />
                                        </ListItemIcon>
                                        Proceed to Business Profile
                                    </MenuItem>
                                )}
                                {onApprove && status !== "ACCEPTED" && (
                                    <MenuItem
                                        onClick={() => {
                                            onApprove();
                                            handleClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <CheckCircle
                                                color={`${theme.palette.primary.light}`}
                                            />
                                        </ListItemIcon>
                                        Approve Contractor
                                    </MenuItem>
                                )}
                                {onDecline && status !== "ACCEPTED" && (
                                    <MenuItem
                                        onClick={() => {
                                            onDecline();
                                            handleClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <XCircle
                                                color={`${theme.palette.error.main}`}
                                            />
                                        </ListItemIcon>
                                        Decline Contractor
                                    </MenuItem>
                                )}
                                {onSendMessage && (
                                    <MenuItem
                                        onClick={() => {
                                            onSendMessage();
                                            handleClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <MessageCircle
                                                color={`${theme.palette.info.main}`}
                                            />
                                        </ListItemIcon>
                                        Send a Message
                                    </MenuItem>
                                )}
                                {onReview && status === "ACCEPTED" && (
                                    <MenuItem
                                        onClick={() => {
                                            onReview();
                                            handleClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <Star
                                                color={`${theme.palette.star.main}`}
                                            />
                                        </ListItemIcon>
                                        Review Business
                                    </MenuItem>
                                )}
                            </Menu>
                        )}
                    </>
                }
            />
        </CustomDashboardCard>
    );
};

export default DashProjectServiceCard;
