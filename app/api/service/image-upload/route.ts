import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { to_base_sixty_four, upload_image } from "@/utils";
import prisma from "@/prisma/client";
import handlePrismaError from "@/prisma/prismaErrorHandler";

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

    if (!user || user.type !== "PRO") {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    const userId = user.id;

    if (!userId) {
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
        // Upload image to cloudinary
        const image = await upload_image(base64, servPro.id);

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
        console.log(error);
        // Handle any errors that occur during the process
        return handlePrismaError(error);
    }
}
