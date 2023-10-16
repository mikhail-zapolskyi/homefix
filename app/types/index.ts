import { Conversation, Message, ServiceProfile, User } from "@prisma/client";

export type FullMessageType = Message & {
    sender: User;
    seen: User[];
};

type UserWithServiceProfile = User & {
    serviceProfile: ServiceProfile;
};

export type ConversationContactsType = Conversation & {
    user: UserWithServiceProfile[];
};
