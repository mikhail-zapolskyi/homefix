import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import errorHandler from "@/lib/error/errorHandler";

export async function GET() {
    const session = await getServerSession(authOptions);

    // Check if a valid session exists
    if (!session) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    // Get the user's ID
    const { id } = session.user;

    if (!id) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    try {
        const reviews = await prisma.review.findMany({
            where: { userId: id },
            include: { service: true, user: true },
        });
        return NextResponse.json(reviews);
    } catch (error) {
        return errorHandler(error);
    }
}
export async function POST(req: NextRequest) {
    const serviceProfileId = await req.json();
    const session = await getServerSession(authOptions);

    // Check if a valid session exists
    if (!session) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    // Get the user's ID
    const { id } = session.user;

    if (!id) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    try {
        const existingReview = await prisma.review.findFirst({
            where: { userId: id, serviceProfileId },
        });
        if (existingReview) {
            return NextResponse.json("You already left a review", {
                status: 400,
            });
        }

        const newReview = await prisma.review.create({
            data: { userId: id, serviceProfileId },
        });
        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        return errorHandler(error);
    }
}
