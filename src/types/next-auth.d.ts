import NextAuth from "next-auth";

// Update Profile provider to receive picture and email_verified
declare module "next-auth" {
	interface Profile {
		id: string;
		picture: string;
		email_verified: boolean;
	}
}
