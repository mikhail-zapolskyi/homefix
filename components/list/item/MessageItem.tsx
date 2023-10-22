import { FullMessageType } from "@/app/types";
import { useMessage } from "@/hooks";
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Fade,
    IconButton,
    ListItem,
    Menu,
    MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { FC } from "react";
import { MoreVertical } from "lucide-react";
import { EditorView } from "@/components";

const StyledCard = styled(Card)(({ theme }) => ({
    width: "100%",
    boxShadow: `${theme.shadows[2]}`,
    minHeight: "max-content",
}));

type Props = FullMessageType & {
    onDelete?: () => void;
};

const MessageItem: FC<Props> = ({ onDelete, ...props }) => {
    const message = useMessage(props);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <ListItem sx={{ width: "100%" }}>
            <StyledCard>
                <CardHeader
                    avatar={
                        <Avatar
                            alt={message.senderName}
                            src={message.senderImage}
                        />
                    }
                    title={message.senderName}
                    subheader={message.createdAt}
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
                                        vertical: "center",
                                    }}
                                    anchorOrigin={{
                                        horizontal: "right",
                                        vertical: "center",
                                    }}
                                    elevation={2}
                                    sx={{
                                        ".MuiPaper-root": {
                                            borderRadius: "1rem",
                                        },
                                    }}
                                >
                                    <MenuItem
                                        onClick={onDelete}
                                        sx={{ color: "error.main" }}
                                    >
                                        Delete Message
                                    </MenuItem>
                                </Menu>
                            )}
                        </>
                    }
                />
                <CardContent>
                    <EditorView content={message.content} />
                </CardContent>
            </StyledCard>
        </ListItem>
    );
};

export default MessageItem;
