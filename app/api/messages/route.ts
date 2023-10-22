import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/lib/pusher/pusher";
import _ from "lodash";
import errorHandler from "@/lib/error/errorHandler";

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

    if (!content) {
        return NextResponse.json(
            { error: "You can't send empty message" },
            { status: 400 }
        );
    }

    if (!conversationId) {
        return NextResponse.json(
            { error: "Empty messages not allowed" },
            { status: 400 }
        );
    }

    if (!pusherServer) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
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

    await pusherServer.trigger(conversationId, "messages:new", newMessage);

    const lastMessage = _.last(updatedConverasation.messages);

    updatedConverasation.user.map((user) => {
        pusherServer.trigger(user.id!, "conversation:update", {
            id: conversationId,
            messages: [lastMessage],
        });
    });

    return NextResponse.json(newMessage);
}

export async function DELETE(req: NextRequest) {
    try {
        const { messageId, userId } = await req.json();
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

        const message = await prisma.message.findUnique({
            where: { id: messageId },
            include: {
                seen: true,
            },
        });

        if (!message) {
            return NextResponse.json(
                { error: "Message deleted" },
                { status: 500 }
            );
        }

        const deletedMessage = await prisma.$transaction([
            prisma.message.update({
                where: {
                    id: messageId,
                },
                data: {
                    seen: {
                        disconnect: message.seen.map((obj) => ({ id: obj.id })),
                    },
                },
            }),
            prisma.message.delete({
                where: {
                    id: messageId,
                },
            }),
        ]);

        const conversationId = deletedMessage[1].conversationId;

        await pusherServer.trigger(
            conversationId,
            "messages:delete",
            deletedMessage[1]
        );

        message.seen.map((user) => {
            pusherServer.trigger(user.id!, "conversation:update", {
                id: conversationId,
                messages: [deletedMessage[1]],
            });
        });

        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.log(error);
        return errorHandler(error);
    }
}
