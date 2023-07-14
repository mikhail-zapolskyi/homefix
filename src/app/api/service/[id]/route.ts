import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma/prisma";

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

    data.userId = id;

    const serviceProfiles = await prisma.serviceProfile.update({
        where: {
            id,
        },
        data,
    });

    return NextResponse.json(serviceProfiles);
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

    try {
        const serviceProfiles = await prisma.serviceProfile.delete({
            where: {
                id,
            },
            select: {
                id: true,
            },
        });
        return NextResponse.json(serviceProfiles);
    } catch (error) {
        console.error(error);
    }
};

export { updateServiceProfiles as PUT, deleteServiceProfile as DELETE };
