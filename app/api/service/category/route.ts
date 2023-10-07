import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import errorHandler from "@/lib/error/errorHandler";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(req: NextRequest) {
    try {
        let category = await prisma.category.findMany();

        return NextResponse.json(category, { status: 200 });
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req: Request) {
    const data: Record<string, any> = await req.json();
    const title: string = data.title.trim().toLowerCase();
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
        let category = await prisma.category.findUnique({
            where: { title },
        });

        if (!category) {
            category = await prisma.category.create({
                data: { title },
            });
        }

        // Create the ServiceCategory and connect it to both category and serviceProfile
        const serviceCategory = await prisma.serviceProfile.update({
            where: { id: serviceProfile.id },
            data: {
                categories: {
                    create: {
                        category: { connect: { id: category.id } },
                    },
                },
            },
        });

        return NextResponse.json({ serviceCategory }, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}
