import {
    Category,
    Conversation,
    Location,
    Message,
    Project,
    ServiceProfile,
    User,
    Post
} from "@prisma/client";

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

export type SearchServiceProfilesType = ServiceProfile & {
    category: Category[];
    location: Location[];
    user: User;
};

export type FullProjectType = Project & {
    service: ServiceProfile[];
};

export type FullPost = Post & {
    serviceProfile: ServiceProfile; 
}
