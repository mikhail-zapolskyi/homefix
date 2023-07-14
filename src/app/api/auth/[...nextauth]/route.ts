import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import Password from "@/utils/bcrypt";
import prisma from "@/lib/prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";

interface ICredential {
    email: string;
    password: string;
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},

            async authorize(credentials, req) {
                const { email, password } = credentials as ICredential;

                if (!email || !password) {
                    throw new Error("Please enter an email and password");
                }

                // const user = await UserModel.getUserByEmail(email);
                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                });

                if (!user || !user.password) {
                    throw new Error("No user found");
                }

                const isPasswordValid = Password.validate(
                    user.password,
                    password
                );

                if (!isPasswordValid) {
                    throw new Error("Incorrect password");
                }

                return user as User;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === "google" && profile) {
                const { email, email_verified } = profile;
                const userExists = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                });
                // Check if user exist and login with google provider, and user email verified change state of user email_verified
                if (userExists && userExists.emailVerified === null) {
                    await prisma.user.update({
                        where: {
                            id: userExists.id,
                        },
                        data: {
                            email: userExists.email,
                            emailVerified: email_verified,
                        },
                    });
                }
            }

            return true;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                };
            }
            return token;
        },
    },
    secret: process.env.PROVIDER_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
    },
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
