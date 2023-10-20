import { NextRequest, NextResponse } from "next/server";

import { to_base_sixty_four } from "@/lib/cloudinary/to_base_sixty_four";
import { upload_image } from "@/lib/cloudinary/upload_image";
import prisma from "@/prisma/client";
import errorHandler from "@/lib/error/errorHandler";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PUT(req: NextRequest) {
    try {
        const formData = await req.formData();
        const base64 = await to_base_sixty_four(formData);
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

        if (base64 === null) {
            return NextResponse.json("File doesn't exist", { status: 400 });
        }

        const image = await upload_image(base64, currentUser.id, "profile");

        const user = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                image,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        return errorHandler(error);
    }
}
