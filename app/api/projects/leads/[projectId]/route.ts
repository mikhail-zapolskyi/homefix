import getCurrentUser from "@/app/actions/getCurrentUser";
import errorHandler from "@/lib/error/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import _ from "lodash";

export async function GET(
    req: NextRequest,
    { params }: { params: { projectId: string } }
) {
    try {
        const { projectId } = params;

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

        const serviceProfile = await prisma.serviceProfile.findFirst({
            where: {
                userId: currentUser.id,
            },
        });

        if (!serviceProfile) {
            return NextResponse.json(
                { error: "You don't have permission to see this lead" },
                { status: 401 }
            );
        }

        const project = await prisma.project.findFirst({
            where: {
                AND: [
                    { id: projectId },
                    {
                        OR: [
                            { serviceProfileId: { has: serviceProfile.id } },
                            { interestedId: { has: serviceProfile.id } },
                            { approvedId: { has: serviceProfile.id } },
                        ],
                    },
                ],
            },
            include: {
                user: true,
                approved: true,
            },
        });

        return NextResponse.json(project);
    } catch (error) {
        return errorHandler(error);
    }
}
