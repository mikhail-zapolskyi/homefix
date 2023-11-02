/**
 * Endpoint for updating a project to approve serviceProfile interest.
 *
 * This endpoint allows a user to approve a project by connecting choosen
 * service profile. It performs checks to ensure the user's eligibility
 *
 * @function PUT
 * @param {NextRequest} req - The NextRequest object containing the request data.
 * @returns {NextResponse} The response containing the result of the update operation.
 * @throws {Error} If an error occurs during the operation, it is handled by the errorHandler.
 *
 * @param {string} req.body.projectId - The unique identifier of the project.
 * @param {string} req.body.serviceProfileId - The unique identifier of the serviceProfile.
 *
 * @throws {401} Unauthorized - If the user is not authorized.
 * @throws {400} Bad Request - If the service profile or project doesn't exist.
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
        const { serviceProfileId } = await req.json();
        console.log(serviceProfileId);
        // Get the current user
        const currentUser = await getCurrentUser();

        // Check if the user is authorized
        if (!currentUser) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

        // Get the service profile associated with the provided ID
        const serviceProfile = await prisma.serviceProfile.findUnique({
            where: { id: serviceProfileId },
        });

        // Check if the service profile exists
        if (!serviceProfile) {
            return NextResponse.json(
                {
                    error: "Service Profile doesn't exist",
                },
                { status: 400 }
            );
        }

        // Get the project associated with the provided ID, including related data
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: {
                interested: true,
                service: true,
            },
        });

        // Check if the project exists
        if (!project) {
            return NextResponse.json(
                { error: "Project doesn't exist" },
                { status: 400 }
            );
        }

        // Update the project to approve service interest to do the job
        // Remove all other serviceProfiles from project, showing that project is gone
        const updatedProject = await prisma.project.update({
            where: {
                id: projectId,
            },
            data: {
                status: "APPROVED",
                approved: {
                    connect: {
                        id: serviceProfile.id,
                    },
                },
                interested: {
                    disconnect: project.interested.map((obj) => ({
                        id: obj.id,
                    })),
                },
                service: {
                    disconnect: project.service.map((obj) => ({
                        id: obj.id,
                    })),
                },
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
