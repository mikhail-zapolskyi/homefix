import getCurrentUser from "@/app/actions/getCurrentUser";
import errorHandler from "@/lib/error/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import _ from "lodash";

export async function GET(req: NextRequest) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

        const serviceProfile = await prisma.serviceProfile.findUnique({
            where: {
                userId: currentUser.id,
            },
        });

        if (!serviceProfile) {
            return NextResponse.json([]);
        }

        const project = await prisma.project.findMany({
            where: {
                serviceProfileId: {
                    has: serviceProfile.id,
                },
            },
            include: {
                service: true,
            },
            orderBy: {
                createAt: "desc",
            },
        });

        return NextResponse.json(project);
    } catch (error) {
        return errorHandler(error);
    }
}
