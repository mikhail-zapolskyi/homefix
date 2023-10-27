import React, { FC } from "react";
import { CustomDashboardCard } from "@/components";
import {
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
import { FullProjectType } from "@/app/types";
import { MoreVertical, UserPlus, Trash2, DraftingCompass } from "lucide-react";
import moment from "moment";
import { blue, green, orange, purple, red } from "@mui/material/colors";

interface Props {
    data: FullProjectType;
    onProceed?: () => void;
    onDelete?: () => void;
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

    const color = {
        INITIATED: blue[600],
        APPROVED: green[600],
        INPROGRESS: orange[600],
        COMPLETED: green[200],
        INCOMPLETED: red[600],
        ACCEPTED: purple[600],
    };

    return (
        // NEED TO IMPLEMET DEFERENT COLORS ON DIFFERENT PROJECT STATES
        <CustomDashboardCard>
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
                                {onProceed && (
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
                                )}
                                {onDelete && (
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
                                    <Typography variant="body1">
                                        Budget:
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="body2">
                                        ${data.budget}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <Typography variant="body1">
                                        Status:
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography
                                        variant="body2"
                                        color={color[data.project_state]}
                                    >
                                        {data.project_state}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </CustomDashboardCard>
    );
};

export default DashProjectCard;
