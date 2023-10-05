/**
 * This code defines two asynchronous functions for handling HTTP requests: GET and PUT.
 *
 * @GET
 *   - Accepts a GET request and retrieves a list of locations based on specified parameters.
 *   - It parses query parameters from the request URL, fetches locations from a local directory,
 *     and returns them as JSON.
 *
 * @PUT
 *   - Accepts a PUT request and updates or creates a location record in a database using Prisma.
 *   - It first checks if the user is authenticated using NextAuth.js session management.
 *   - If authenticated, it either updates an existing location or creates a new one based on the data received in the request.
 *
 * Dependencies:
 *   - next/server: Provides the NextResponse object for handling HTTP responses.
 *   - path: For working with file paths.
 *   - "@/utils": Custom utility functions for processing query parameters and fetching locations.
 *   - "next-auth": For managing authentication sessions.
 *   - "../auth/[...nextauth]/route": Imports authentication options.
 *   - "@/prisma/client": Imports Prisma for database operations.
 *   - "@/lib/error/errorHandler": Handles errors that may occur during request processing.
 */

import { NextResponse } from "next/server";
import path from "path";
import { getLocations, getSearchParams } from "@/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import errorHandler from "@/lib/error/errorHandler";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const params = getSearchParams(searchParams);
        const locationDir = path.join(process.cwd(), "assets/locations");
        const locations = await getLocations(locationDir, params);
        return NextResponse.json(locations);
    } catch (error) {
        return errorHandler(error);
    }
}

export async function PUT(req: Request) {
    const data = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "You are not authenticated" });
    }

    const { id } = session.user;
    if (!id) {
        return NextResponse.json({ message: "You are not authorized" });
    }

    if (!data.serviceProfileId) {
        data.userId = id;
    }

    try {
        const existingLocation = await prisma.location.findFirst({
            where: {
                OR: [
                    { userId: data.userId },
                    { serviceProfileId: data.serviceProfileId },
                ],
            },
        });

        if (existingLocation) {
            const updatedLocation = await prisma.location.update({
                where: {
                    id: existingLocation.id,
                },
                data,
            });

            return NextResponse.json(updatedLocation);
        } else {
            const newLocation = await prisma.location.create({
                data,
            });

            return NextResponse.json(newLocation);
        }
    } catch (error) {
        return errorHandler(error);
    }
}
