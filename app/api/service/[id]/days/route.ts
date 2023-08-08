import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

// Add a new day to the database
export const POST = async (
    req: NextRequest,
    {
        params,
    }: {
        params: { id: string };
    }
) => {
    const { id } = params;
    const data = await req.json();
    data.serviceProfileId = id;

    try {
        const days = await prisma.day.create({
            data,
        });
        return NextResponse.json(days, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
};

// Get all days from the database
export const GET = async (
    req: NextRequest,
    {
        params,
    }: {
        params: { id: string };
    }
) => {
    const { id } = params;
    try {
        const days = await prisma.day.findMany({
            where: { serviceProfileId: id },
        });
        return NextResponse.json(days, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
};
