import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import errorHandler from "@/lib/error/errorHandler";

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
