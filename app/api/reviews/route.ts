import { NextRequest, NextResponse } from "next/server";
import { calcualteAverage } from "@/utils";
import prisma from "@/prisma/client";
import { Review } from "@prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import errorHandler from "@/lib/error/errorHandler";
import _ from "lodash";

export async function GET(req: NextRequest) {
    try {
        // GET CURRENT USER
        const currentUser = await getCurrentUser();
        // DEFINE QUERY FOR SEARCH
        let query;

        // VERIFY IF CURRENT USER EXIST
        if (!currentUser) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }
        // DEFINE QUERY BY TESTING IF ONLY USER PRESENT OR BOTH
        if (currentUser && currentUser.serviceProfile) {
            query = {
                OR: [
                    { userId: currentUser.id },
                    { serviceProfileId: currentUser.serviceProfile.id },
                ],
            };
        } else {
            query = { userId: currentUser.id };
        }

        const reviews = await prisma.review.findMany({
            where: query,
            include: {
                service: true,
                user: true,
            },
        });

        return NextResponse.json(reviews);
    } catch (error) {
        return errorHandler(error);
    }
}

/**
 * This code defines a Next.js API route that handles the creation of reviews for service profiles. It uses Next.js authentication (likely with NextAuth.js) to ensure the user is authorized.
 *
 * - It receives a POST request with JSON data containing details of a review.
 * - It checks if a valid user session exists, and if not, it returns a 401 unauthorized error.
 * - It validates that the user is not trying to review their own profile and returns a 403 forbidden error if they are.
 * - It then creates a new review in the database using Prisma.
 * - It calculates the average rating for a service profile based on all its reviews and updates the service profile's rating.
 * - Finally, it returns the newly created review as JSON with a 201 status code.
 *
 * This code should be used as an API endpoint in a Next.js application to handle the submission of user reviews for service profiles.
 */
export async function POST(req: NextRequest) {
    try {
        const data: Review = await req.json();
        const currentUser = await getCurrentUser();

        // Check if a valid current user from session
        if (!currentUser) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

        // Get service profile
        const serviceProfile = await prisma.serviceProfile.findFirst({
            where: {
                AND: [
                    { id: data.serviceProfileId },
                    { userId: currentUser.id },
                ],
            },
        });

        // Verify if this service is not associated with the user.
        if (serviceProfile && serviceProfile.id === data.serviceProfileId) {
            return NextResponse.json(
                { error: "It is not allowed to assess your own work." },
                { status: 403 }
            );
        }

        // Verify if this review already has been completed
        const isReviewed = await prisma.project.findFirst({
            where: {
                AND: [{ id: data.projectId }, { status: "REVIEWED" }],
            },
        });

        // If Reviewed return message
        if (isReviewed) {
            return NextResponse.json(
                { error: "Project was already reviewed" },
                { status: 403 }
            );
        }

        await prisma.review.create({
            data: {
                ...data,
                userId: currentUser.id,
            },
        });

        const project = await prisma.project.update({
            where: {
                id: data.projectId,
            },
            data: {
                status: "REVIEWED",
            },
        });

        // Get all overall_ratings
        const serviceReviews = await prisma.review.findMany({
            where: {
                serviceProfileId: data.serviceProfileId,
            },
            select: { overall_rating: true },
        });

        // Update servicePorfile avarage rating
        const ratings = _.map(serviceReviews, "overall_rating");
        const average = Math.round(_.mean(ratings));

        await prisma.serviceProfile.update({
            where: { id: data.serviceProfileId },
            data: { rating: average },
        });

        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        errorHandler(error);
    }
}
