import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import errorHandler from "@/lib/error/errorHandler";

export async function POST(req: Request) {
    const data = await req.json();
    console.log(data);
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    const user = session.user;

    if (!user) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    const userId = user.id;

    if (userId === data.proId) {
        return NextResponse.json(
            { error: "You can't review your self" },
            { status: 401 }
        );
    }

    if (!userId) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    data.userId = session.user.id;

    try {
        const reviews = await prisma.review.create({
            data: {
                rating: data.rating,
                comment: data.comment,
                userId,
                serviceProfileId: data.serviceId,
            },
        });
        return NextResponse.json(reviews);
    } catch (error) {
        return errorHandler(error);
    }
}
