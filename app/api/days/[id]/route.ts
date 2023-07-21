import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma/prisma";

// Update a day by id
export const PUT = async (
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

    try {
        const updatedDay = await prisma.day.update({
            where: {
                id,
            },
            data,
        });

        return NextResponse.json(updatedDay, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { id } = params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    try {
        const deletedDay = await prisma.day.delete({
            where: {
                id,
            },
            select: {
                id: true,
            },
        });
        return NextResponse.json(deletedDay, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
};
