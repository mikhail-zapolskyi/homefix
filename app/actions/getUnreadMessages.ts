import prisma from "@/prisma/client";

export default async function getUnreadMessages(query: Record<string, any>) {
    // query.status = "UNREAD"

    try {
        const unreadMessages = await prisma.message.count({
            where: query,
        });

        return unreadMessages;
    } catch (error) {
        return null;
    }
}
