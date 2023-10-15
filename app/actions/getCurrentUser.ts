/**
 * This function is responsible for retrieving the current user's data using Prisma ORM.
 * It first attempts to get the user's session using the getSession function.
 * If a valid session with a user ID is found, it queries the database for the user's data.
 * If the user exists, their data is returned; otherwise, it returns null.
 *
 * @async
 * @function getCurrentUser
 * @returns {Promise<Object|null>} A Promise that resolves to the current user's data if found, or null if not found.
 * @throws {Error} If an error occurs during session retrieval or database query, it is caught and handled, returning error.
 */
import prisma from "@/prisma/client";
import getSession from "./getSession";
import errorHandler from "@/lib/error/errorHandler";

export default async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session || !session.user || !session.user.id) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            },
        });

        if (!currentUser) {
            return null;
        }

        return currentUser;
    } catch (error) {
        return errorHandler(error);
    }
}
