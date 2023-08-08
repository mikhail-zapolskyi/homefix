import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "../../../prisma/client";
import { buildQueryObject, calcualteAverage } from "@/utils";

const getReviews = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const query = buildQueryObject(searchParams);

    const reviews = await prisma.review.findMany(query);

    return NextResponse.json(reviews);
};

const createReviews = async (req: NextRequest) => {
    const data = await req.json();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    data.userId = session?.user.id;

    const reviews = await prisma.review.create({
        data,
    });

    // Update servicePorfile avarage rating
    const serviceReviews = await prisma.review.findMany({
        where: {
            id: data.servicePorfileId,
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
        where: { id: data.serviceProfileId },
        data: { rating: averageRating },
    });

    return NextResponse.json(reviews, { status: 201 });
};

export { getReviews as GET, createReviews as POST };
