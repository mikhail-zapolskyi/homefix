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
                customers: true,
                reviews: {
                    select: {
                        id: true,
                        rating: true,
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

        const stats: Record<string, any> = {
            average_rating: serviceProfile.rating,
            ratings: [
                { name: "1 star", value: 0 },
                { name: "2 star", value: 0 },
                { name: "3 star", value: 0 },
                { name: "4 star", value: 0 },
                { name: "5 star", value: 0 },
            ],
            total_reviews: 0,
            total_customers: 0,
            customers: [],
        };

        for (const obj of serviceProfile.reviews) {
            if (obj.rating && obj.rating >= 1 && obj.rating <= 5) {
                const index = obj.rating - 1;
                stats.ratings[index].value++;
                stats.total_reviews++;
            }
        }

        for (const obj of serviceProfile.customers) {
            const year = obj.date.getFullYear();

            const existingYearEntry = stats.customers.find(
                (obj: Record<string, any>) => obj.year === year
            );

            if (existingYearEntry) {
                existingYearEntry.value++;
            } else {
                stats.customers.push({ year, value: 1 });
            }
            stats.total_customers++;
        }

        const output = {
            stats,
        };

        return NextResponse.json(output);
    } catch (error) {
        return errorHandler(error);
    }
}
