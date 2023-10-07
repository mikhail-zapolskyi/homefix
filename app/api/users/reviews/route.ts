import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import errorHandler from "@/lib/error/errorHandler";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    try {
        const reviews = await prisma.review.findMany({
            where: { userId: currentUser.id },
            include: { service: true, user: true },
        });
        return NextResponse.json(reviews);
    } catch (error) {
        return errorHandler(error);
    }
}
export async function POST(req: NextRequest) {
    const data = await req.json();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    try {
        const existingReview = await prisma.review.findFirst({
            where: {
                userId: currentUser.id,
                serviceProfileId: data.serviceProfileId,
            },
        });
        if (existingReview) {
            return NextResponse.json("You already left a review", {
                status: 400,
            });
        }

        const newReview = await prisma.review.create({
            data: {
                userId: currentUser.id,
                serviceProfileId: data.serviceProfileId,
            },
        });
        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        return errorHandler(error);
    }
}
