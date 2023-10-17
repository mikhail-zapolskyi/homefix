import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: NextRequest) {
    const { conversationId, content } = await req.json();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    if (!conversationId) {
        return NextResponse.json(
            { error: "Please choose conversation" },
            { status: 400 }
        );
    }

    if (!conversationId) {
        return NextResponse.json(
            { error: "Empty messages not allowed" },
            { status: 400 }
        );
    }

    const newMessage = await prisma.message.create({
        include: {
            seen: true,
            sender: true,
        },
        data: {
            content,
            conversation: {
                connect: { id: conversationId },
            },
            sender: {
                connect: { id: currentUser.id },
            },
            seen: {
                connect: {
                    id: currentUser.id,
                },
            },
        },
    });

    const updatedConverasation = await prisma.conversation.update({
        where: {
            id: conversationId,
        },
        data: {
            lastMessageAt: new Date(),
            messages: {
                connect: {
                    id: newMessage.id,
                },
            },
        },
        include: {
            user: true,
            messages: {
                include: {
                    seen: true,
                },
            },
        },
    });
    console.log(updatedConverasation);
    return NextResponse.json(newMessage);
}
