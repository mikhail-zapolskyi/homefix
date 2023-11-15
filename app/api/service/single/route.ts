import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import errorHandler from "@/lib/error/errorHandler";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET() {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.type !== "PRO") {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    try {
        const serviceProfile = await prisma.serviceProfile.findUnique({
            where: {
                userId: currentUser.id,
            },
            include: {
                location: true,
                businessHours: true,
                categories: {
                    include: {
                        category: true,
                    },
                },
                reviews: {
                    select: {
                        id: true,
                        overall_rating: true,
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
        console.log(serviceProfile);
        return NextResponse.json(serviceProfile);
    } catch (error) {
        console.log(error);
        return errorHandler(error);
    }
}
