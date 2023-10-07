import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import errorHandler from "@/lib/error/errorHandler";
import prisma from "@/prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const currentUser = await getCurrentUser();
        let userId: string | null = null;
        let content: string = "";

        if (!currentUser) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        } else {
            userId = currentUser.id;
            content = `<h3>You've received a contact request from ${currentUser.name}</h3>`;
        }

        if (!data) {
            return NextResponse.json(
                { error: "Service Profile ID missing" },
                { status: 400 }
            );
        }

        if (data.userId === userId) {
            return NextResponse.json(
                { error: "You are not allowed send request to your self" },
                { status: 400 }
            );
        }

        const isContact = await prisma.contact.findFirst({
            where: {
                AND: [{ userId }, { serviceProfileId: data.serviceProfileId }],
            },
        });

        const isContactRequest = await prisma.contactRequest.findFirst({
            where: {
                AND: [{ userId }, { serviceProfileId: data.serviceProfileId }],
            },
        });

        if (isContact || isContactRequest) {
            return NextResponse.json(
                { error: "This user already in your contact list" },
                { status: 400 }
            );
        }

        await prisma.contactRequest.create({
            data: {
                userId,
                serviceProfileId: data.serviceProfileId,
            },
        });

        if (data.message) {
            content += data.message;
        }

        const conversations = await prisma.conversations.create({
            data: {
                userId,
                serviceProfileId: data.serviceProfileId,
            },
        });

        await prisma.message.create({
            data: {
                content,
                userId,
                serviceProfileId: data.serviceProfileId,
                conversationId: conversations.id,
            },
        });

        return NextResponse.json({ msg: "Request Sent" });
    } catch (error) {
        console.log(error);
        return errorHandler(error);
    }
}
