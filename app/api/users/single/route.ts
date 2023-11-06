import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import errorHandler from "@/lib/error/errorHandler";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: currentUser.id },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                type: true,
                phone: true,
                location: {
                    select: {
                        address: true,
                        city: true,
                        state: true,
                        country: true,
                        postalCode: true,
                    },
                },
                projects: {
                    where: {
                        OR: [
                            { status: "INITIATED" },
                            { status: "IN_PROGRESS" },
                            { status: "COMPLETED" },
                            { status: "REVIEWED" },
                        ],
                    },
                    select: {
                        status: true,
                        createdAt: true,
                    },
                },
            },
        });
        return NextResponse.json(user);
    } catch (error) {
        return errorHandler(error);
    }
}
