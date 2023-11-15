/**
 * Endpoint for updating a project to project in progress of work.
 *
 * This endpoint allows a users related to project change status to inprogress
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

        // Update the project to change status to inprogress
        const updatedProject = await prisma.project.update({
            where: {
                id: projectId,
            },
            data: {
                status: "IN_PROGRESS",
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
