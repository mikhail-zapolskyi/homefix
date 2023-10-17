import { NextRequest, NextResponse } from "next/server";
import { to_base_sixty_four, upload_image } from "@/lib";
import prisma from "@/prisma/client";
import errorHandler from "@/lib/error/errorHandler";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PUT(req: NextRequest, res: NextResponse) {
    const formData = await req.formData();
    const base64 = await to_base_sixty_four(formData);
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.type !== "PRO") {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    if (base64 === null) {
        return NextResponse.json("File doesn't exist");
    }

    try {
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
        // Upload image to cloudinary
        const image = await upload_image(base64, servPro.id, "profile");

        // Update the service profile with the provided data
        const serviceProfiles = await prisma.serviceProfile.update({
            where: {
                id: servPro.id,
            },
            data: {
                image,
            },
        });

        // Return a JSON response with the updated service profile
        return NextResponse.json(serviceProfiles);
    } catch (error) {
        // Handle any errors that occur during the process
        return errorHandler(error);
    }
}
