import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

// Add a new day to the database
export const POST = async (req: NextRequest) => {
    const data = await req.json();

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
export const GET = async (req: NextRequest) => {
    try {
        const days = await prisma.day.findMany();
        return NextResponse.json(days, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
};
