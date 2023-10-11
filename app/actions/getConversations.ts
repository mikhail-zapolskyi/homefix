import prisma from "@/prisma/client";

const getConversations = async (query: Record<string, any>) => {
    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: "desc",
            },
            where: query,
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
                service: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
                messages: {
                    include: {
                        service: {
                            select: {
                                name: true,
                                image: true,
                            },
                        },
                        user: {
                            select: {
                                name: true,
                                image: true,
                            },
                        },
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
