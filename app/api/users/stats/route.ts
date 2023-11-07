import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import errorHandler from "@/lib/error/errorHandler";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { calculateYearToDataStats } from "@/utils";

export async function GET() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    try {
        const aggregate = await prisma.$transaction(async () => {
            return {
                // GET PROJECTS CREATED DATE FOR CALCULATING YEAR TO YEAR PERCENT
                projectsStats: calculateYearToDataStats(
                    await prisma.project.findMany({
                        where: {
                            AND: [{ userId: currentUser.id }],
                        },
                        select: {
                            createdAt: true,
                        },
                    })
                ),
                // GET TOTAL PROJECTS
                totalProjects: await prisma.project.count({
                    where: {
                        AND: [{ userId: currentUser.id }],
                    },
                }),
                // GET TOTAL INITIATED PROJECTS
                initiated: await prisma.project.count({
                    where: {
                        AND: [
                            { userId: currentUser.id },
                            { status: "INITIATED" },
                        ],
                    },
                }),
                // GET TOTAL APPROVED PROJECTS
                approved: await prisma.project.count({
                    where: {
                        AND: [
                            { userId: currentUser.id },
                            { status: "APPROVED" },
                        ],
                    },
                }),
                // GET TOTAL IN PROGRESS PROJECTS
                in_progress: await prisma.project.count({
                    where: {
                        AND: [
                            { userId: currentUser.id },
                            { status: "IN_PROGRESS" },
                        ],
                    },
                }),
                // GET TOTAL COMLETED PROJECTS
                completed: await prisma.project.count({
                    where: {
                        AND: [
                            { userId: currentUser.id },
                            { status: "COMPLETED" },
                        ],
                    },
                }),
                // GET TOTAL ACCEPTED PROJECTS
                accepted: await prisma.project.count({
                    where: {
                        AND: [
                            { userId: currentUser.id },
                            { status: "ACCEPTED" },
                        ],
                    },
                }),
                // GET TOTAL REVIEWED PROJECTS
                reviewed: await prisma.project.count({
                    where: {
                        AND: [
                            { userId: currentUser.id },
                            { status: "REVIEWED" },
                        ],
                    },
                }),
                // GET REVIEWS CREATED DATE FOR CALCULATING YEAR TO YEAR PERCENT
                reviewsStats: calculateYearToDataStats(
                    await prisma.review.findMany({
                        where: {
                            userId: currentUser.id,
                        },
                        select: {
                            createdAt: true,
                        },
                    })
                ),
                // GET TOTAL REVIEWS
                totalReviews: await prisma.review.count({
                    where: {
                        AND: [{ userId: currentUser.id }],
                    },
                }),
                contactsStats: calculateYearToDataStats(
                    await prisma.contact.findMany({
                        where: {
                            AND: [
                                { userId: { has: currentUser.id } },
                                {
                                    contactRequest: {
                                        every: { request_status: "ACCEPTED" },
                                    },
                                },
                            ],
                        },
                        select: {
                            createdAt: true,
                        },
                    })
                ),
                totalContacts: await prisma.contact.count({
                    where: {
                        AND: [
                            { userId: { has: currentUser.id } },
                            {
                                contactRequest: {
                                    every: { request_status: "ACCEPTED" },
                                },
                            },
                        ],
                    },
                }),
                total: await prisma.user.findUnique({
                    where: { id: currentUser.id },
                    select: {
                        _count: {
                            select: {
                                projects: true,
                                contact: {
                                    where: {
                                        contactRequest: {
                                            every: {
                                                request_status: "ACCEPTED",
                                            },
                                        },
                                    },
                                },
                                reviews: true,
                            },
                        },
                    },
                }),
            };
        });

        const stats = await aggregate;

        return NextResponse.json(stats);
    } catch (error) {
        return errorHandler(error);
    }
}
