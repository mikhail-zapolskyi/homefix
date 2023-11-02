/**
 * Endpoint for updating a project to express interest.
 *
 * This endpoint allows a user to express their interest in a project by connecting it
 * to their service profile. It performs checks to ensure the user's eligibility
 * and that the user is not connecting their own project.
 *
 * @function PUT
 * @param {NextRequest} req - The NextRequest object containing the request data.
 * @returns {NextResponse} The response containing the result of the update operation.
 * @throws {Error} If an error occurs during the operation, it is handled by the errorHandler.
 *
 * * @param {string} req.body.projectId - The unique identifier of the project to express interest in.
 */

import getCurrentUser from "@/app/actions/getCurrentUser";
import errorHandler from "@/lib/error/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import _ from "lodash";

export async function PUT(
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
            where: { userId: currentUser.id },
        });

        if (!serviceProfile) {
            return NextResponse.json(
                {
                    error: "Not pro users cannot express interest in the project",
                },
                { status: 400 }
            );
        }

        const isUserProject = await prisma.project.findFirst({
            where: {
                id: projectId,
                userId: currentUser.id,
            },
        });

        if (isUserProject) {
            return NextResponse.json(
                { error: "You cannot express interest to your project" },
                { status: 400 }
            );
        }

        const project = await prisma.project.update({
            where: {
                id: projectId,
            },
            data: {
                interested: {
                    connect: {
                        id: serviceProfile.id,
                    },
                },
                service: {
                    disconnect: {
                        id: serviceProfile.id,
                    },
                },
            },
            include: {
                service: true,
            },
        });

        return NextResponse.json(project);
    } catch (error) {
        return errorHandler(error);
    }
}
