import { FullMessageType } from "@/app/types";
import moment from "moment";
import { useMemo } from "react";

const useMessage = ({ ...props }: FullMessageType) => {
    const date = new Date().toISOString();
    const defaultUserName = "Guest User";
    const defaultUserImage = "";
    const defaultCreatedAt = moment(date).format("LLL");
    const defaultContent = "Message is empty";

    return useMemo(() => {
        return {
            senderName:
                props.sender && props.sender.name
                    ? props.sender.name
                    : defaultUserName,
            senderImage:
                props.sender && props.sender.image
                    ? props.sender.image
                    : defaultUserImage,
            createdAt: props.createdAt
                ? moment(props.createdAt).format("LLL")
                : defaultCreatedAt,
            content: props.content ? props.content : defaultContent,
        };
    }, [props]);
};

export default useMessage;
