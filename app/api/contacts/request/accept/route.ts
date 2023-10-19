/**
 * Endpoint: Accept Contact Request
 *
 * Description:
 * This endpoint handles the acceptance of a contact request. When a user accepts a contact request,
 * it updates the request's status to "ACCEPTED" and connects the user to the corresponding conversation.
 *
 * HTTP Method: POST
 *
 * Request Body:
 * - Expects a JSON request body containing the `contactRequestId`, `sender`, `contactId`.
 *
 * Authorization:
 * - The user must be authorized to perform this action.
 *
 * Dependencies:
 * - errorHandler: A utility function for handling and logging errors.
 * - NextRequest, NextResponse: Import from "next/server" for handling HTTP requests and responses.
 * - prisma: Database client for interacting with the database.
 * - getCurrentUser: A function to retrieve the current user.
 *
 * Exported Function:
 * - POST(req: NextRequest): Handles the HTTP POST request to accept a contact request.
 *   - Verifies the user's authorization and updates the contact request status.
 *   - Connects the user to the corresponding conversation by creating a "You are connected" message.
 *   - Returns a JSON response with a success message or an error message.
 */

import errorHandler from "@/lib/error/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: NextRequest) {
    try {
        const { contactRequestId, contactId, sender } = await req.json();
        const currentUser = await getCurrentUser();

        if (!currentUser || !currentUser.id) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

        if (!contactRequestId || !contactId || !sender) {
            return NextResponse.json(
                {
                    error: "An error occurred, and the necessary request data is not present",
                },
                { status: 400 }
            );
        }

        if (sender === currentUser.id) {
            return NextResponse.json(
                { error: "You cannot approve a request you initiated" },
                { status: 400 }
            );
        }

        await prisma.$transaction([
            prisma.contactRequest.update({
                where: {
                    id: contactRequestId,
                },
                data: {
                    request_status: "ACCEPTED",
                },
            }),
            prisma.contact.update({
                where: {
                    id: contactId,
                },
                data: {
                    conversation: {
                        create: {
                            messages: {
                                create: {
                                    content: "You are connected",
                                },
                            },
                            user: {
                                connect: [
                                    { id: currentUser.id },
                                    { id: sender },
                                ],
                            },
                        },
                    },
                },
            }),
        ]);

        return NextResponse.json({ message: "Request Accepted" });
    } catch (error) {
        console.log(error);
        return errorHandler(error);
    }
}
