import { ConversationContactsType } from "@/app/types";
import { useConversations } from "@/hooks";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
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
                borderColor: "success.main",
            }}
            onClick={onClick}
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
