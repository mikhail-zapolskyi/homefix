import NextAuth from "next-auth";

// Update Profile provider to receive picture and email_verified
declare module "next-auth" {
    interface Profile {
        id: string;
        picture: string;
        email_verified: boolean;
    }

    interface Session {
        user: {
            id?: string | null | undefined;
            name?: string | null | undefined;
            email?: string | null | undefined;
            image?: string | null | undefined;
        };
    }
}
