import { ConversationContactsType } from "@/app/types";
import { useConversations } from "@/hooks";
import {
    Avatar,
    Badge,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@mui/material";
import React, { FC } from "react";

type Props = ConversationContactsType & {
    activeConversationId: string;
    onClick?: () => void;
};

const DashConversationCard: FC<Props> = ({
    activeConversationId,
    onClick,
    ...props
}) => {
    const converasation = useConversations(props);

    return (
        <ListItem
            alignItems="flex-start"
            sx={{
                cursor: "pointer",
                borderRight:
                    activeConversationId === converasation.id ? 4 : "none",
                borderColor: "info.main",
                padding: 0,
            }}
            onClick={onClick}
            secondaryAction={
                <Badge
                    color="success"
                    anchorOrigin={{ vertical: "top", horizontal: "left" }}
                    badgeContent=""
                    overlap="circular"
                    variant="dot"
                />
            }
        >
            <ListItemAvatar>
                <Avatar alt="avatar" src={converasation.userImage} />
            </ListItemAvatar>
            <ListItemText
                primary={converasation.userName}
                secondary={`Last Message: ${converasation.lastMessageAt}`}
            />
        </ListItem>
    );
};

export default DashConversationCard;
