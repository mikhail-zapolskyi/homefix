/**
 * Module Name: Send Contact Request
 *
 * Description:
 * This code module handles the sending of contact requests. It exports a single function, POST, which is designed to 
 * handle incoming HTTP POST requests. The function processes the request's data and performs the necessary checks 
 * and operations to send a contact request to another user in the system.
 *
 * Request Data Expected:
 * - The function POST expects an HTTP POST request with a JSON payload containing information about the recipient user (userId).

 * Dependencies:
 * - NextRequest and NextResponse from "next/server": These are used for handling HTTP requests and responses in a Next.js 
 * application.
 * - errorHandler from "@/lib/error/errorHandler": This is a custom error handling utility.
 * - prisma from "@/prisma/client": Prisma client for interacting with the database.
 * - getCurrentUser from "@/app/actions/getCurrentUser": A function to fetch the currently logged-in user.
 * - isContactRequest from "@/app/actions/isContactRequest": A function to check if a contact request has already been 
 * sent to a user.
 *
 * Exported Functions:
 * - POST(req: NextRequest): This function handles incoming POST requests for sending contact requests. It expects a 
 * JSON payload containing information about the recipient user (userId). It performs authorization checks, verifies 
 * that a request is not sent to oneself, and checks if a request has already been sent to the recipient. If all checks 
 * pass, it creates a contact request in the database and responds with a success message. In case of errors, it delegates 
 * error handling to the errorHandler utility.
 */

import { NextRequest, NextResponse } from "next/server";
import errorHandler from "@/lib/error/errorHandler";
import prisma from "@/prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { isContactRequest } from "@/app/actions/isContactRequest";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const currentUser = await getCurrentUser();

        if (!currentUser || !currentUser.id) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

        if (currentUser.id === data.userId) {
            return NextResponse.json(
                {
                    error: "You are prohibited from sending a contact request to yourself",
                },
                { status: 400 }
            );
        }

        if (await isContactRequest(currentUser.id, data.userId)) {
            return NextResponse.json(
                { error: "Contact Request has been already sent" },
                { status: 400 }
            );
        }

        await prisma.contactRequest.create({
            data: {
                sender: currentUser.id,
                contact: {
                    create: {
                        user: {
                            connect: [
                                { id: currentUser.id },
                                { id: data.userId },
                            ],
                        },
                    },
                },
            },
        });

        return NextResponse.json({
            message: "Contact Request Sent",
        });
    } catch (error) {
        return errorHandler(error);
    }
}
