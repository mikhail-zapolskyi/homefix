import getCurrentUser from "@/app/actions/getCurrentUser";
import errorHandler from "@/lib/error/errorHandler";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || !currentUser.id) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

        const contacts = await prisma.contact.findMany({
            where: {
                userId: {
                    has: currentUser.id,
                },
            },
            select: {
                id: true,
                createdAt: true,
                contactRequest: {
                    select: {
                        id: true,
                        createdAt: true,
                        request_status: true,
                        sender: true,
                    },
                },
                user: {
                    where: {
                        id: { not: currentUser.id },
                    },
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        type: true,
                        serviceProfile: true,
                    },
                },
            },
        });

        const aggregateContacts = contacts
            .map((obj: Record<string, any>) => {
                const contact: Record<string, any> = {
                    id: obj.id,
                    createdAt: obj.createdAt,
                    contactRequest: obj.contactRequest[0],
                    user: obj.user[0],
                };

                return contact;
            })
            .sort((contactA, contactB) => {
                const userNameA = contactA.user.name;
                const userNameB = contactB.user.name;

                return userNameA.localeCompare(userNameB);
            });

        return NextResponse.json(aggregateContacts);
    } catch (error) {
        errorHandler(error);
    }
}
