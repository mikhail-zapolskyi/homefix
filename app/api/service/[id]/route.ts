import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import errorHandler from "@/lib/error/errorHandler";

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
                    select: {
                        id: true,
                        category: {
                            select: {
                                title: true,
                            },
                        },
                    },
                },
                posts: true,
                reviews: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                image: true,
                            },
                        },
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
