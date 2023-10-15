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

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { calcualteAverage } from "@/utils";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest) {
    const data = await req.json();
    const session = await getServerSession(authOptions);

    // Check if a valid session exists
    if (!session) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    // Get the user from the session
    const user = session.user;

    // Check if the user exists
    if (!user) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    if (user.id == data.proId) {
        NextResponse.json("Sorry you can not write a review for yourself!", {
            status: 403,
        });
        return;
    }

    data.userId = user.id;
    const newData = {
        userId: data.userId,
        serviceProfileId: data.serviceId,
        comment: data.comment,
        rating: data.rating,
    };

    const reviews = await prisma.review.create({
        data: newData,
    });

    // Update servicePorfile avarage rating
    const serviceReviews = await prisma.review.findMany({
        where: {
            serviceProfileId: data.serviceId,
        },
        select: { rating: true },
    });

    const totalRating = serviceReviews.length;
    const sumRatings = serviceReviews.reduce(
        (sum, review) => sum + (review.rating || 0),
        0
    );
    const averageRating = calcualteAverage(totalRating, sumRatings);

    await prisma.serviceProfile.update({
        where: { id: data.serviceId },
        data: { rating: averageRating },
    });

    return NextResponse.json(reviews, { status: 201 });
}
