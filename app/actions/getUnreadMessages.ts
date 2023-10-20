import prisma from "@/prisma/client";
import _ from "lodash";

export default async function getUnreadMessages(currentUserId: string) {
    try {
        const conversations = await prisma.conversation.findMany({
            where: {
                userId: {
                    has: currentUserId,
                },
            },
            include: {
                messages: {
                    select: {
                        seen: true,
                    },
                },
                _count: {
                    select: {
                        messages: {
                            where: {
                                senderId: { not: currentUserId },
                                NOT: {
                                    seenId: { has: currentUserId },
                                },
                            },
                        },
                    },
                },
            },
        });

        const unreadMessages = _.sumBy(conversations, function (obj) {
            return obj._count.messages;
        });

        return unreadMessages;
    } catch (error) {
        return null;
    }
}
