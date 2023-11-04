import {
    ConversationContactsType,
    ReviewWithUserAndServiceProfile,
} from "@/app/types";
import { useConversations } from "@/hooks";
import {
    Avatar,
    Badge,
    CardHeader,
    Fade,
    Grid,
    IconButton,
    LinearProgress,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import moment from "moment";
import React, { FC } from "react";
import CustomDashboardCard from "./CustomDashboardCard";
import { DraftingCompass, MoreVertical, Star } from "lucide-react";
import SingleProgressLine from "../progress/SingleProgressLine";

type Props = ReviewWithUserAndServiceProfile & {
    onClick?: () => void;
};

const ReviewListCard: FC<Props> = ({ onClick, ...props }) => {
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
        <Grid item xs={12}>
            <CustomDashboardCard padding="0.5rem" minHeight="1rem">
                <CardHeader
                    avatar={
                        <Avatar
                            alt={`${props.user.name}`}
                            src={props.user.image!}
                        />
                    }
                    title={`${props.user.name} | ${moment(
                        props.createdAt
                    ).format("LLL")}`}
                    subheader={
                        <SingleProgressLine
                            value={props.overall_rating}
                            title="Rated"
                        />
                    }
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
                                    <MenuItem
                                    // onClick={() => {
                                    //     onProceedToProject();
                                    //     handleClose();
                                    // }}
                                    >
                                        <ListItemIcon>
                                            <DraftingCompass />
                                        </ListItemIcon>
                                        Proceed to Project
                                    </MenuItem>
                                </Menu>
                            )}
                        </>
                    }
                />
            </CustomDashboardCard>
        </Grid>
    );
};

export default ReviewListCard;
