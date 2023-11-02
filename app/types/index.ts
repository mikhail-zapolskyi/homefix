import {
    Category,
    Conversation,
    Location,
    Message,
    Project,
    ServiceProfile,
    User,
    Post,
    Contact,
    ContactRequest,
    $Enums,
    Review,
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
    service?: ServiceProfile[];
    interested?: ServiceProfile[];
    approved?: ServiceProfile[];
    interest?: string | null;
    user?: User;
};

export type FullPost = Post & {
    serviceProfile: ServiceProfile;
};

type UserWithServiceProfileOrNull = User & {
    serviceProfile: ServiceProfile | null;
};

export type FullContactType = Contact & {
    contactRequest: ContactRequest[];
    user: UserWithServiceProfileOrNull[];
};

export type ReviewCreationType = Review & {
    id?: string;
};
