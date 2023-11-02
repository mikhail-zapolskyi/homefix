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

        const projects = await prisma.project.findMany({
            where: {
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
            },
            include: {
                service: true,
                interested: true,
                approved: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const aggregatedProjects = _.map(
            projects,
            function (obj: FullProjectType) {
                if (obj.interestedId.includes(serviceProfile.id)) {
                    return { ...obj, interest: "INITIATED" };
                }

                if (obj.approvedId.includes(serviceProfile.id)) {
                    return { ...obj, interest: "ACCEPTED" };
                }

                return { ...obj, interest: null };
            }
        );

        return NextResponse.json(aggregatedProjects);
    } catch (error) {
        return errorHandler(error);
    }
}
