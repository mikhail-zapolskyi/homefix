import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { Day } from "@prisma/client";
import errorHandler from "@/lib/error/errorHandler";

// Update a day by id
export async function PUT(req: NextRequest) {
    const data = await req.json();

    // Retrieve the user's session to check authorization
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
    const servPro = await prisma.serviceProfile.findUnique({
        where: {
            userId,
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
        const businessHours = await Promise.all(
            data.map(async (day: Record<string, any>, index: number) => {
                delete day.id;

                if (!day.serviceProfileId) {
                    day.serviceProfileId = servPro.id;
                }

                if (!day.date) {
                    const currentDate = new Date();
                    currentDate.setDate(currentDate.getDate() + index);
                    day.date = currentDate;
                }

                return await prisma.day.upsert({
                    where: {
                        date: day.date,
                        serviceProfileId: servPro.id,
                    },
                    update: day,
                    create: day as Day,
                });
            })
        );

        return NextResponse.json(businessHours, { status: 200 });
    } catch (error: any) {
        return errorHandler(error);
    }
}
