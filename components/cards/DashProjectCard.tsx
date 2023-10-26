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
import { FullProjectType } from "@/app/types";
import { MoreVertical, UserPlus, Trash2, DraftingCompass } from "lucide-react";
import moment from "moment";

interface Props {
    data: FullProjectType;
    onProceed: () => void;
    onDelete: () => void;
}

const DashProjectCard: FC<Props> = ({ data, onProceed, onDelete }) => {
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
                    title={data.title}
                    subheader={moment(data.createAt).format("LLL")}
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
                                        onClick={() => {
                                            onProceed();
                                            handleClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <DraftingCompass />
                                        </ListItemIcon>
                                        Proceed to Project
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            onDelete();
                                            handleClose();
                                        }}
                                        sx={{
                                            color: "warning.main",
                                        }}
                                    >
                                        <ListItemIcon>
                                            <Trash2
                                                color={
                                                    theme.palette.warning.main
                                                }
                                            />
                                        </ListItemIcon>
                                        Delete Project
                                    </MenuItem>
                                </Menu>
                            )}
                        </>
                    }
                />
            </>
        </CustomDashboardCard>
    );
};

export default DashProjectCard;
