import getCurrentUser from "@/app/actions/getCurrentUser";
import errorHandler from "@/lib/error/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import _ from "lodash";

export async function GET(
    req: NextRequest,
    { params }: { params: { projectId: string } }
) {
    try {
        const { projectId } = params;

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

        const project = await prisma.project.findFirst({
            where: {
                AND: [{ id: projectId }, { userId: currentUser.id }],
            },
            include: {
                service: true,
                interested: true,
                approved: true,
            },
        });

        return NextResponse.json(project);
    } catch (error) {
        return errorHandler(error);
    }
}
