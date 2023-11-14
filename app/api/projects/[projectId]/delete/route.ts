import getCurrentUser from "@/app/actions/getCurrentUser";
import errorHandler from "@/lib/error/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import _ from "lodash";

export async function DELETE(
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

        if (!projectId) {
            return NextResponse.json(
                { error: "Project Id missing" },
                { status: 400 }
            );
        }

        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
            },
            include: {
                service: true,
                interested: true,
                approved: true,
            },
        });

        if (!project) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 400 }
            );
        }

        await prisma.$transaction([
            prisma.project.update({
                where: {
                    id: project.id,
                },
                data: {
                    service: {
                        disconnect: project.service.map((obj) => ({
                            id: obj.id,
                        })),
                    },
                    interested: {
                        disconnect: project.interested.map((obj) => ({
                            id: obj.id,
                        })),
                    },
                    approved: {
                        disconnect: project.approved.map((obj) => ({
                            id: obj.id,
                        })),
                    },
                },
            }),
            prisma.project.delete({
                where: {
                    id: project.id,
                },
            }),
        ]);

        return NextResponse.json({});
    } catch (error) {
        return errorHandler(error);
    }
}
