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
    Day,
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
    user: User;
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


type ReviewWithUser = Review & {
    user: User;
};

export type ViewServiceProfileType = ServiceProfile & {
    location: Location[];
    businessHours: Day[];
    categories: Category[];
    posts: Post[];
    reviews: ReviewWithUser[];
};

export type ReviewCriteria = {
    service_quality: number | null | undefined;
    punctuality: number | null | undefined;
    communication: number | null | undefined;
    consultations: number | null | undefined;
    professionalism: number | null | undefined;
    expertise: number | null | undefined;
    efficiency: number | null | undefined;
    accuracy: number | null | undefined;
    friendliness: number | null | undefined;
    problem_solving: number | null | undefined;
    emergency: number | null | undefined;
    value_for_money: number | null | undefined;
    reliability: number | null | undefined;
    transparency: number | null | undefined;
    discounts: number | null | undefined;
    innovation: number | null | undefined;
    accountability: number | null | undefined;
};

export type ReviewCreationType = Omit<
    Review,
    | "id"
    | "createdAt"
    | "userId"
    | "serviceProfileId"
    | "projectId"
    | "overall_rating"
    | "content"
>;

export type ReviewWithUserAndServiceProfile = Review & {
    user: User;
    service: ServiceProfile;
};

type Stats = {
    overYear: {
        name: string;
        value: number;
    }[];
    yearToDate: number;
};

export type StatslUserType = {
    projectsStats: Stats;
    totalProjects: number;
    initiated: number;
    approved: number;
    in_progress: number;
    completed: number;
    accepted: number;
    reviewed: number;
    contactsStats: Stats;
    totalContacts: number;
    reviewsStats: Stats;
    totalReviews: number;
};

type StatusKey =
    | "ALL"
    | "INITIATED"
    | "APPROVED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "INCOMPLETED"
    | "ACCEPTED"
    | "REVIEWED";

export type StatusCount = {
    [key in StatusKey]: number;
};

export type StatusCountsArray = Array<StatusCount>;
