import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { to_base_sixty_four, upload_image } from "@/utils";
import prisma from "@/prisma/client";
import errorHandler from "@/lib/error/errorHandler";

export async function PUT(req: NextRequest, res: NextResponse) {
    const formData = await req.formData();
    const base64 = await to_base_sixty_four(formData);
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

    const id = user.id;

    if (!id) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    if (base64 === null) {
        return NextResponse.json("File doesn't exist", { status: 400 });
    }

    try {
        // Find the service profile associated with the user
        const isUser = await prisma.user.findUnique({
            where: {
                id,
            },
        });

        // Check if the service profile exists
        if (isUser === null) {
            return NextResponse.json(
                {
                    error: "User profile not found",
                },
                { status: 404 }
            );
        }
        // Upload image to cloudinary
        const image = await upload_image(base64, isUser.id, "profile");

        // Update the service profile with the provided data
        const userProfiles = await prisma.user.update({
            where: {
                id: isUser.id,
            },
            data: {
                image,
            },
        });

        // Return a JSON response with the updated service profile
        return NextResponse.json(userProfiles);
    } catch (error) {
        // Handle any errors that occur during the process
        return errorHandler(error);
    }
}
