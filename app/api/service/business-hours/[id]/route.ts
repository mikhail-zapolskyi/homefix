import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import errorHandler from "@/lib/error/errorHandler";
import getCurrentUser from "@/app/actions/getCurrentUser";

// DELETE DAY
export async function DELETE(
    req: NextRequest,
    {
        params,
    }: {
        params: { id: string };
    }
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
    const servPro = await prisma.serviceProfile.findUnique({
        where: {
            userId: currentUser.id,
        },
    });

    // Check if the service profile exists
    if (servPro === null) {
        return NextResponse.json(
            {
                error: "Service profile not found",
            },
            { status: 404 }
        );
    }

    try {
        const businessHours = await prisma.day.delete({
            where: {
                id,
            },
        });

        return NextResponse.json(businessHours, { status: 200 });
    } catch (error: any) {
        return errorHandler(error);
    }
}
