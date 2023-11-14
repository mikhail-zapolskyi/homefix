import getCurrentUser from "@/app/actions/getCurrentUser";
import errorHandler from "@/lib/error/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import _ from "lodash";
import { FullProjectType } from "@/app/types";
import { ServiceProfile } from "@prisma/client";

export async function GET(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

        const transaction = await prisma.$transaction(async () => {
            return {
                projects: await prisma.project.findMany({
                    where: {
                        userId: currentUser.id,
                    },
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
                    {
                        // GET TOTAL PROJECTS
                        ALL: await prisma.project.count({
                            where: {
                                AND: [{ userId: currentUser.id }],
                            },
                        }),
                    },
                    {
                        // GET TOTAL INITIATED PROJECTS
                        INITIATED: await prisma.project.count({
                            where: {
                                AND: [
                                    { userId: currentUser.id },
                                    { status: "INITIATED" },
                                ],
                            },
                        }),
                    },
                    {
                        // GET TOTAL APPROVED PROJECTS
                        APPROVED: await prisma.project.count({
                            where: {
                                AND: [
                                    { userId: currentUser.id },
                                    { status: "APPROVED" },
                                ],
                            },
                        }),
                    },
                    {
                        // GET TOTAL IN PROGRESS PROJECTS
                        IN_PROGRESS: await prisma.project.count({
                            where: {
                                AND: [
                                    { userId: currentUser.id },
                                    { status: "IN_PROGRESS" },
                                ],
                            },
                        }),
                    },
                    {
                        // GET TOTAL COMLETED PROJECTS
                        COMPLETED: await prisma.project.count({
                            where: {
                                AND: [
                                    { userId: currentUser.id },
                                    { status: "COMPLETED" },
                                ],
                            },
                        }),
                    },
                    {
                        // GET TOTAL ACCEPTED PROJECTS
                        ACCEPTED: await prisma.project.count({
                            where: {
                                AND: [
                                    { userId: currentUser.id },
                                    { status: "ACCEPTED" },
                                ],
                            },
                        }),
                    },
                    {
                        // GET TOTAL REVIEWED PROJECTS
                        REVIEWED: await prisma.project.count({
                            where: {
                                AND: [
                                    { userId: currentUser.id },
                                    { status: "REVIEWED" },
                                ],
                            },
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

export async function DELETE(req: NextRequest) {
    try {
        const { projectIds } = await req.json();
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }
        if (_.isEmpty(projectIds)) {
            return NextResponse.json(
                { error: "Projects Id missing" },
                { status: 400 }
            );
        }

        const projects = await prisma.project.findMany({
            where: {
                OR: projectIds.map((id: string) => {
                    return { id: id };
                }),
            },
            include: {
                service: true,
                interested: true,
                approved: true,
            },
        });

        if (_.isEmpty(projects)) {
            return NextResponse.json(
                { error: "Projects not found" },
                { status: 400 }
            );
        }

        projects.map(async (obj) => {
            await prisma.$transaction([
                prisma.project.update({
                    where: {
                        id: obj.id,
                    },
                    data: {
                        service: {
                            disconnect: obj.service.map(
                                (serviceObj: ServiceProfile) => ({
                                    id: serviceObj.id,
                                })
                            ),
                        },
                        interested: {
                            disconnect: obj.interested.map(
                                (serviceObj: ServiceProfile) => ({
                                    id: serviceObj.id,
                                })
                            ),
                        },
                        approved: {
                            disconnect: obj.approved.map(
                                (serviceObj: ServiceProfile) => ({
                                    id: serviceObj.id,
                                })
                            ),
                        },
                    },
                }),
                prisma.project.delete({
                    where: {
                        id: obj.id,
                    },
                }),
            ]);
        });

        return NextResponse.json({});
    } catch (error) {
        return errorHandler(error);
    }
}
