import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Day } from "@prisma/client";
import errorHandler from "@/lib/error/errorHandler";
import getCurrentUser from "@/app/actions/getCurrentUser";

// Update a day by id
export async function PUT(req: NextRequest) {
    const data = await req.json();
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
