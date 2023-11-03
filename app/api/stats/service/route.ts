import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import errorHandler from "@/lib/error/errorHandler";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser || currentUser.type !== "PRO") {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

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
                user: {
                    include: {
                        contact: true,
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
            if (
                obj.overall_rating &&
                obj.overall_rating >= 1 &&
                obj.overall_rating <= 5
            ) {
                const index = obj.overall_rating - 1;
                stats.ratings[index].value++;
                stats.total_reviews++;
            }
        }

        for (const obj of serviceProfile.user.contact) {
            const year = obj.createdAt.getFullYear();

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
