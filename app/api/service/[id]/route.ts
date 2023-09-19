import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import handlePrismaError from "@/prisma/prismaErrorHandler";

export async function GET(
    req: NextRequest,
    {
        params,
    }: {
        params: { id: string };
    }
) {
    const { id } = params;

    try {
        const serviceProfile = await prisma.serviceProfile.findUnique({
            where: {
                id,
            },
            include: {
                location: true,
                businessHours: true,
                categories: {
                    include: {
                        category: true,
                    },
                },
                posts: true,
                reviews: true,
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
        console.log(error);
        return handlePrismaError(error);
    }
}
