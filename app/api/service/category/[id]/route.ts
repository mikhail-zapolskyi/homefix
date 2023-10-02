import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import errorHandler from "@/lib/error/errorHandler";

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
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

    // Check if the user exists and is of type 'PRO' (professional)
    if (!user || user.type !== "PRO") {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    // Get the user's ID
    const userId = user.id;

    // Check if the user's ID exists
    if (!userId) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    // Find the service profile associated with the user
    const serviceProfile = await prisma.serviceProfile.findUnique({
        where: {
            userId,
        },
    });

    // Check if the service profile exists
    if (serviceProfile === null) {
        return NextResponse.json(
            {
                error: "Service profile not found",
            },
            { status: 404 }
        );
    }

    try {
        await prisma.serviceCategory.deleteMany({
            where: {
                id,
            },
        });

        return NextResponse.json({ msg: "deleted" }, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}
