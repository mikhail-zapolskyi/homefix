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
    Trash2,
    ClipboardCheck,
    MessageCircle,
    CheckCircle,
    CircleDotDashed,
    Building2,
    XCircle,
} from "lucide-react";
import { blue, green, orange, purple, red } from "@mui/material/colors";

type Props = {
    name: string | null;
    rating?: number;
    onProceed?: () => void;
    onApprove?: () => void;
    onDecline?: () => void;
    onSendMessage?: () => void;
};

const DashProjectServiceCard: FC<Props> = ({
    name,
    rating,
    onProceed,
    onApprove,
    onDecline,
    onSendMessage,
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

    const color = {
        INITIATED: blue[600],
        ACCEPTED: green[400],
        INPROGRESS: orange[600],
        COMPLETED: green[700],
        INCOMPLETED: red[600],
        APPROVED: purple[600],
    };

    return (
        <CustomDashboardCard>
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
                                {onApprove && (
                                    <MenuItem
                                        onClick={() => {
                                            onApprove();
                                            handleClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <CheckCircle
                                                color={color["ACCEPTED"]}
                                            />
                                        </ListItemIcon>
                                        Approve Contractor
                                    </MenuItem>
                                )}
                                {onDecline && (
                                    <MenuItem
                                        onClick={() => {
                                            onDecline();
                                            handleClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <XCircle
                                                color={`${theme.palette.warning.main}`}
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
                                                color={`${theme.palette.primary.main}`}
                                            />
                                        </ListItemIcon>
                                        Send a Message
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
