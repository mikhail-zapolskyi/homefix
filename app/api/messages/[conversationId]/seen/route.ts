import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/prisma/client";
import _ from "lodash";
import errorHandler from "@/lib/error/errorHandler";

interface IParams {
    conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

        if (!conversationId) {
            return NextResponse.json(
                { error: "Invalid conversation ID" },
                { status: 400 }
            );
        }

        // Find existing conversation and include only messages without seenId of currentUser.id
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                messages: {
                    include: {
                        seen: {
                            where: {
                                id: { not: currentUser.id },
                            },
                        },
                    },
                },
                user: true,
            },
        });

        if (!conversation) {
            return new NextResponse("Invalid Conversation", { status: 400 });
        }

        if (_.isEmpty(conversation.messages)) {
            return NextResponse.json({}, { status: 200 });
        }
        // Update all messages seen by connecting current user
        const updateMessagesPromise = conversation.messages.map((message) => {
            return prisma.message.update({
                where: {
                    id: message.id,
                },
                include: {
                    sender: true,
                    seen: true,
                },
                data: {
                    seen: {
                        connect: {
                            id: currentUser.id,
                        },
                    },
                },
            });
        });

        await prisma.$transaction(updateMessagesPromise);

        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        console.log(error, "ERROR_MESSAGES_SEEN");
        return errorHandler(error);
    }
}
