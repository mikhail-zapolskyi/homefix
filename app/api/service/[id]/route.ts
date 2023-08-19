import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/prisma/client";

const updateServiceProfiles = async (
    req: NextRequest,
    {
        params,
    }: {
        params: { id: string };
    }
) => {
    const { id } = params;
    const data = await req.json();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    const userId = session.user.id;

    try {
        if (userId) {
            const servPro = await prisma.serviceProfile.findUnique({
                where: {
                    userId,
                },
            });

            if (servPro === null || servPro.userId !== userId) {
                return NextResponse.json(
                    {
                        message:
                            "You have no rights to do changes to service profile",
                    },
                    { status: 404 }
                );
            }

            const serviceProfiles = await prisma.serviceProfile.update({
                where: {
                    id,
                },
                data,
            });

            return NextResponse.json(serviceProfiles);
        }
    } catch (error) {
        console.log(error);
    }
};

const deleteServiceProfile = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { id } = params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    const userId = session.user.id;

    try {
        if (userId) {
            const servPro = await prisma.serviceProfile.findUnique({
                where: {
                    userId,
                },
            });

            if (servPro === null || servPro.userId !== userId) {
                return NextResponse.json(
                    {
                        message: "You have no rights to delete service profile",
                    },
                    { status: 404 }
                );
            }

            const serviceProfiles = await prisma.serviceProfile.delete({
                where: {
                    id,
                },
                select: {
                    id: true,
                },
            });

            return NextResponse.json(serviceProfiles);
        }
    } catch (error) {
        console.log(error);
    }
};

export { updateServiceProfiles as PUT, deleteServiceProfile as DELETE };
