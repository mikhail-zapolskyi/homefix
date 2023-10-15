import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import errorHandler from "@/lib/error/errorHandler";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.type !== "PRO") {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    // Find the service profile associated with the user
    const serviceProfile = await prisma.serviceProfile.findUnique({
        where: {
            userId: currentUser.id,
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
