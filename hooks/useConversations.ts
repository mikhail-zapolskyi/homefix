import { ConversationContactsType } from "@/app/types";
import moment from "moment";
import { useMemo } from "react";

const useConversations = ({ ...props }: ConversationContactsType) => {
    const date = new Date().toISOString();
    const DefaultId = "";
    const defaultUserName = "Guest User";
    const defaultUserImage = "";
    const defaultLastMessageAt = moment(date).fromNow();

    return useMemo(() => {
        return {
            id: props.id || DefaultId,
            userName:
                props.user[0] && props.user[0].serviceProfile
                    ? props.user[0].serviceProfile.name
                        ? props.user[0].serviceProfile.name
                        : props.user[0].name
                        ? props.user[0].name
                        : defaultUserName
                    : defaultUserName,
            userImage:
                props.user[0] && props.user[0].serviceProfile
                    ? props.user[0].serviceProfile.image
                        ? props.user[0].serviceProfile.image
                        : props.user[0].image
                        ? props.user[0].image
                        : defaultUserImage
                    : defaultUserImage,
            lastMessageAt: props.createdAt
                ? moment(props.lastMessageAt).fromNow()
                : defaultLastMessageAt,
        };
    }, [props]);
};

export default useConversations;
