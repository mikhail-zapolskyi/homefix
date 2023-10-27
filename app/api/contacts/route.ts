import getCurrentUser from "@/app/actions/getCurrentUser";
import { FullContactType } from "@/app/types";
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
            include: {
                contactRequest: true,
                user: {
                    where: {
                        id: { not: currentUser.id },
                    },
                    include: {
                        serviceProfile: true,
                    },
                },
            },
        });

        const aggregateContacts: FullContactType[] = contacts
            .map((obj: FullContactType) => {
                return obj;
            })
            .sort((contactA, contactB) => {
                const userNameA = contactA.user[0].name!;
                const userNameB = contactB.user[0].name!;

                return userNameA.localeCompare(userNameB);
            });

        return NextResponse.json(aggregateContacts);
    } catch (error) {
        errorHandler(error);
    }
}
