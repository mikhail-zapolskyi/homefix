import React, { FC } from "react";
import { CustomDashboardCard, EditorView } from "@/components";
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
import {
    MoreVertical,
    Trash2,
    ClipboardCheck,
    MessageCircle,
    CheckCircle,
    CircleDotDashed,
    User2,
    ThumbsUp,
    DraftingCompass,
} from "lucide-react";
import moment from "moment";
import { blue, brown, green, orange, purple, red } from "@mui/material/colors";
import { $Enums, ServiceProfile, User } from "@prisma/client";

type Props = {
    title: string | null;
    createdAt: Date;
    budget: number | null;
    status: $Enums.ProjectStatus;
    content?: string | null | undefined;
    interest?: string | null | undefined;
    user?: User;
    interested?: ServiceProfile[];
    approved?: ServiceProfile[];
    onProceedToProject?: () => void;
    onAccept?: () => void;
    onInprogress?: () => void;
    onComplete?: () => void;
    onIncomplete?: () => void;
    onApprove?: () => void;
    onDelete?: () => void;
    onSendMessage?: () => void;
    onInterest?: () => void;
    onProceedToUserProfile?: () => void;
};

const DashProjectCard: FC<Props> = ({
    title,
    createdAt,
    budget,
    content,
    status,
    interest,
    interested,
    approved,
    user,
    onProceedToProject,
    onInprogress,
    onComplete,
    onIncomplete,
    onAccept,
    onDelete,
    onSendMessage,
    onInterest,
    onProceedToUserProfile,
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
        INITIATED: `${theme.palette.info.light}`,
        APPROVED: `${theme.palette.primary.main}`,
        IN_PROGRESS: `${theme.palette.fair.main}`,
        COMPLETED: `${theme.palette.primary.dark}`,
        INCOMPLETED: `${theme.palette.bad.main}`,
        ACCEPTED: `${theme.palette.secondary.main}`,
        REVIEWED: `${theme.palette.star.dark}`,
    };

    return (
        <CustomDashboardCard>
            <CardHeader
                title={title}
                subheader={moment(createdAt).format("LLL")}
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
                                {onProceedToProject && (
                                    <MenuItem
                                        onClick={() => {
                                            onProceedToProject();
                                            handleClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <DraftingCompass />
                                        </ListItemIcon>
                                        Proceed to Project
                                    </MenuItem>
                                )}
                                {onProceedToUserProfile && (
                                    <MenuItem
                                        onClick={() => {
                                            onProceedToUserProfile();
                                            handleClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <User2 />
                                        </ListItemIcon>
                                        Proceed to User Profile
                                    </MenuItem>
                                )}
                                {onInterest && status === "INITIATED" && (
                                    <MenuItem
                                        onClick={() => {
                                            onInterest();
                                            handleClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <ThumbsUp
                                                color={`${theme.palette.primary.light}`}
                                            />
                                        </ListItemIcon>
                                        Express Interest
                                    </MenuItem>
                                )}
                                {onInprogress && status === "APPROVED" && (
                                    <MenuItem
                                        onClick={() => {
                                            onInprogress();
                                            handleClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <CircleDotDashed
                                                color={color["IN_PROGRESS"]}
                                            />
                                        </ListItemIcon>
                                        Project in Progress
                                    </MenuItem>
                                )}
                                {onComplete && status === "IN_PROGRESS" && (
                                    <MenuItem
                                        onClick={() => {
                                            onComplete();
                                            handleClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <ClipboardCheck
                                                color={color["COMPLETED"]}
                                            />
                                        </ListItemIcon>
                                        Complete Project
                                    </MenuItem>
                                )}
                                {onIncomplete && status === "IN_PROGRESS" && (
                                    <MenuItem
                                        onClick={() => {
                                            onIncomplete();
                                            handleClose();
                                        }}
                                        sx={{
                                            color: "warning.main",
                                        }}
                                    >
                                        <ListItemIcon>
                                            <Trash2
                                                color={color["INCOMPLETED"]}
                                            />
                                        </ListItemIcon>
                                        Incomplete Project
                                    </MenuItem>
                                )}
                                {onAccept && status === "COMPLETED" && (
                                    <MenuItem
                                        onClick={() => {
                                            onAccept();
                                            handleClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <CheckCircle
                                                color={color["ACCEPTED"]}
                                            />
                                        </ListItemIcon>
                                        Accept Project Completion
                                    </MenuItem>
                                )}
                                {onDelete && status !== "ACCEPTED" && (
                                    <MenuItem
                                        onClick={() => {
                                            onDelete();
                                            handleClose();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <Trash2
                                                color={theme.palette.error.main}
                                            />
                                        </ListItemIcon>
                                        Delete Project
                                    </MenuItem>
                                )}
                                {onSendMessage && status !== "INITIATED" && (
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
                            </Menu>
                        )}
                    </>
                }
            />
            <CardContent>
                {content && <EditorView content={content || ""} />}
                <TableContainer>
                    <Table aria-label="customized table">
                        <TableBody>
                            {status !== "ACCEPTED" && (
                                <>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="body1">
                                                Budget:
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="body2">
                                                ${budget}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    {interest && (
                                        <TableRow>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                <Typography variant="body1">
                                                    Interest:
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography
                                                    variant="body2"
                                                    color={
                                                        color[
                                                            interest as keyof typeof color
                                                        ]
                                                    }
                                                >
                                                    {interest}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            )}
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <Typography variant="body1">
                                        Status:
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography
                                        variant="body2"
                                        color={color[status]}
                                    >
                                        {status}
                                    </Typography>
                                </TableCell>
                            </TableRow>

                            {interested && (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="body1">
                                            Project Contractor:
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="body2">
                                            {interested.length}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                            {approved &&
                                approved.map((obj: ServiceProfile) => (
                                    <TableRow key={obj.id}>
                                        <TableCell component="th" scope="row">
                                            <Typography variant="body1">
                                                Project Contractor:
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography
                                                variant="body2"
                                                color={
                                                    color[
                                                        interest as keyof typeof color
                                                    ]
                                                }
                                            >
                                                {obj.name}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {user && (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="body1">
                                            Project Owner:
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            variant="body2"
                                            color={
                                                color[
                                                    interest as keyof typeof color
                                                ]
                                            }
                                        >
                                            {user.name}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                            {status === "ACCEPTED" && (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        <Typography variant="body1">
                                            Job has been successfully completed
                                            and is now awaiting review.
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </CustomDashboardCard>
    );
};

export default DashProjectCard;
