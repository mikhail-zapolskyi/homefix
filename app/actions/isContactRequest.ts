import prisma from "@/prisma/client";

export const isContactRequest = async (
    currentUserId: string,
    userId: string
) => {
    try {
        const existingContactRequest = await prisma.contact.findFirst({
            where: {
                AND: [
                    {
                        user: {
                            some: {
                                id: currentUserId,
                            },
                        },
                    },
                    {
                        user: {
                            some: {
                                id: userId,
                            },
                        },
                    },
                    {
                        contactRequest: {
                            some: {
                                request_status: "PENDING",
                            },
                        },
                    },
                ],
            },
        });

        return existingContactRequest;
    } catch (error) {
        return null;
    }
};
