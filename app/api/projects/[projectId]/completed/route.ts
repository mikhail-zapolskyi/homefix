/**
 * Endpoint for updating a project to Completed.
 *
 * This endpoint allows a users how does the service for user to change status to completed
 *
 * @function PUT
 * @param {NextRequest} req - The NextRequest object containing the request data.
 * @returns {NextResponse} The response containing the result of the update operation.
 * @throws {Error} If an error occurs during the operation, it is handled by the errorHandler.
 *
 * @param {string} req.body.projectId - The unique identifier of the project.
 *
 * @throws {401} Unauthorized - If the user is not authorized.
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
        // Extract project and service profile IDs from the request body
        const { projectId } = params;

        // Get the current user
        const currentUser = await getCurrentUser();

        // // Check if the user is authorized
        if (!currentUser) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

        // Get Service profile by currentUser id
        const serviceProfile = await prisma.serviceProfile.findFirst({
            where: { userId: currentUser.id },
        });

        // Check if profile exists
        if (!serviceProfile) {
            return NextResponse.json(
                {
                    error: "You are not allowed to change status",
                },
                { status: 400 }
            );
        }
        // Find project to confirm that service profile in the project and status is in progress
        const isServiceProject = await prisma.project.findFirst({
            where: {
                AND: [
                    { id: projectId },
                    { approvedId: { has: serviceProfile.id } },
                    { status: "IN_PROGRESS" },
                ],
            },
        });

        if (!isServiceProject) {
            return NextResponse.json(
                { error: "You are not allowed to make changes" },
                { status: 400 }
            );
        }

        // Update the project to change status to Copmleted
        const updatedProject = await prisma.project.update({
            where: {
                id: projectId,
            },
            data: {
                status: "COMPLETED",
            },
            include: {
                service: true,
                interested: true,
                approved: true,
            },
        });

        // Return the updated project as the response
        return NextResponse.json(updatedProject);
    } catch (error) {
        // Handle any errors using the errorHandler
        return errorHandler(error);
    }
}
