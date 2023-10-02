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
                location: {
                    select: {
                        id: true,
                        address: true,
                        city: true,
                        state: true,
                        country: true,
                        postalCode: true,
                    },
                },
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
                    select: {
                        comment: true,
                        rating: true,
                        id: true,
                        user: {
                            select: {
                                name: true,
                                image: true,
                            },
                        },
                        createdAt: true,
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
        console.log(error);
        return handlePrismaError(error);
    }
}
