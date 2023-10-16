import prisma from "@/prisma/client";

export default async function getUnreadMessages(currentUserId: string) {
    // query.status = "UNREAD"

    try {
        const unreadMessages = await prisma.message.count({
            where: {
                seenId: {
                    has: currentUserId,
                },
            },
        });

        return unreadMessages;
    } catch (error) {
        return null;
    }
}
