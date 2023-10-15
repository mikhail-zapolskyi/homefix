/**
 * This code exports a utility function for retrieving a user session using Next.js and next-auth.
 *
 * @module Auth/GetSession
 * @exports getSession
 */

import { getServerSession } from "next-auth";

// Import the authentication options from the nextauth route
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Retrieves a user session by utilizing the Next.js server-side session management
 * and next-auth library.
 *
 * @async
 * @function getSession
 * @returns {Promise<object|null>} A Promise that resolves to the user session object
 *                                if a session exists, or null if not.
 */
export default async function getSession() {
    return await getServerSession(authOptions);
}
