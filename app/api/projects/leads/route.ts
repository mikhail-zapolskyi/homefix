import getCurrentUser from "@/app/actions/getCurrentUser";
import errorHandler from "@/lib/error/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import _ from "lodash";
import { FullProjectType } from "@/app/types";

export async function GET(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

        const serviceProfile = await prisma.serviceProfile.findUnique({
            where: {
                userId: currentUser.id,
            },
        });

        if (!serviceProfile) {
            return NextResponse.json([]);
        }

        const query = {
            OR: [
                {
                    serviceProfileId: {
                        has: serviceProfile.id,
                    },
                },
                {
                    interestedId: {
                        has: serviceProfile.id,
                    },
                },
                {
                    approvedId: {
                        has: serviceProfile.id,
                    },
                },
            ],
        };

        const transaction = await prisma.$transaction(async () => {
            return {
                projects: await prisma.project.findMany({
                    where: query,
                    include: {
                        service: true,
                        interested: true,
                        approved: true,
                        user: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                }),
                count: [
                    // GET TOTAL PROJECTS
                    {
                        ALL: await prisma.project.count({
                            where: query,
                        }),
                    },
                    // GET TOTAL INITIATED PROJECTS
                    {
                        INITIATED: await prisma.project.count({
                            where: { ...query, status: "INITIATED" },
                        }),
                    },
                    // GET TOTAL APPROVED PROJECTS
                    {
                        APPROVED: await prisma.project.count({
                            where: { ...query, status: "APPROVED" },
                        }),
                    },
                    // GET TOTAL IN PROGRESS PROJECTS
                    {
                        IN_PROGRESS: await prisma.project.count({
                            where: { ...query, status: "IN_PROGRESS" },
                        }),
                    },
                    // GET TOTAL COMLETED PROJECTS
                    {
                        COMPLETED: await prisma.project.count({
                            where: { ...query, status: "COMPLETED" },
                        }),
                    },
                    {
                        INCOMPLETED: await prisma.project.count({
                            where: { ...query, status: "INCOMPLETED" },
                        }),
                    },
                    // GET TOTAL ACCEPTED PROJECTS
                    {
                        ACCEPTED: await prisma.project.count({
                            where: { ...query, status: "ACCEPTED" },
                        }),
                    },
                    // GET TOTAL REVIEWED PROJECTS
                    {
                        REVIEWED: await prisma.project.count({
                            where: { ...query, status: "REVIEWED" },
                        }),
                    },
                ],
            };
        });

        return NextResponse.json(transaction);
    } catch (error) {
        return errorHandler(error);
    }
}
