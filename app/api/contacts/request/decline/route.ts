/**
 * Module Name: Decline Contact Request
 *
 * Description:
 * This module handles a POST request to decline a contact request. When a user wishes to decline a contact request,
 * they send a request to this endpoint with the required data, and this code manages the process of declining the request.
 *
 * Dependencies:
 * - errorHandler: A utility function for handling and formatting errors within the application.
 * - NextRequest: An object provided by the Next.js framework for managing HTTP requests.
 * - NextResponse: An object provided by the Next.js framework for generating HTTP responses.
 * - prisma: An Object-Relational Mapping (ORM) tool used for interacting with the database.
 * - getCurrentUser: A function from the application that fetches the current user's information.
 *
 * Expected Data:
 *  On request json data must have contactId and recipient userId
 */

import errorHandler from "@/lib/error/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: NextRequest) {
    try {
        const data: Record<string, any> = await req.json();
        const currentUser = await getCurrentUser();

        if (!currentUser || !currentUser.id) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

        if (!data.contactId || !data.userId) {
            return NextResponse.json(
                { error: "Contact request doesn't exist" },
                { status: 400 }
            );
        }

        const isContactExist = await prisma.contact.findUnique({
            where: { id: data.contactId },
        });

        const isRecipientUser = await prisma.user.findUnique({
            where: { id: data.userId },
        });

        if (!isContactExist || !isRecipientUser) {
            return NextResponse.json(
                { error: "Contact request doesn't exist" },
                { status: 400 }
            );
        }

        await prisma.$transaction([
            prisma.user.update({
                where: { id: currentUser.id },
                data: {
                    contact: {
                        disconnect: [{ id: data.contactId }],
                    },
                },
            }),
            prisma.user.update({
                where: { id: data.userId },
                data: {
                    contact: {
                        disconnect: [{ id: data.contactId }],
                    },
                },
            }),
            prisma.contact.delete({
                where: {
                    id: data.contactId,
                },
            }),
        ]);

        return NextResponse.json({ message: "Request Declined" });
    } catch (error) {
        return errorHandler(error);
    }
}
