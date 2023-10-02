import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import errorHandler from "@/lib/error/errorHandler";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    const user = session.user;

    if (!user || user.type !== "PRO") {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    const userId = user.id;

    if (!userId) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    try {
        const serviceProfile = await prisma.serviceProfile.findUnique({
            where: {
                userId,
            },
            include: {
                location: true,
                businessHours: true,
                categories: {
                    include: {
                        category: true,
                    },
                },
            },
        });

        if (!serviceProfile) {
            return NextResponse.json(
                {
                    error: "Service profile not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(serviceProfile);
    } catch (error) {
        return errorHandler(error);
    }
}
