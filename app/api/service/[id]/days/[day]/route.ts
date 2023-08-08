import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/prisma/client";

// Get a day by id
export const GET = async (
    req: NextRequest,
    {
        params,
    }: {
        params: { day: string };
    }
) => {
    const { day } = params;
    try {
        const days = await prisma.day.findUnique({
            where: { id: day },
        });
        return NextResponse.json(days, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
};

// Update a day by id
export const PUT = async (
    req: NextRequest,
    {
        params,
    }: {
        params: { day: string };
    }
) => {
    const { day } = params;
    const data = await req.json();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    try {
        const updatedDay = await prisma.day.update({
            where: {
                id: day,
            },
            data,
        });

        return NextResponse.json(updatedDay, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
};

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { day: string } }
) => {
    const { day } = params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    try {
        const deletedDay = await prisma.day.delete({
            where: {
                id: day,
            },
            select: {
                id: true,
            },
        });
        return NextResponse.json(deletedDay, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
};
