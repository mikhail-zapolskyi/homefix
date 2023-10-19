import prisma from "@/prisma/client";

const getConversations = async (currentUserId: string) => {
    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: "desc",
            },
            where: {
                userId: {
                    has: currentUserId,
                },
            },
            include: {
                user: {
                    where: {
                        id: { not: currentUserId },
                    },
                    include: {
                        serviceProfile: true,
                    },
                },
            },
        });

        return conversations;
    } catch (error: any) {
        return [];
    }
};

export default getConversations;
