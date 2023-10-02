import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import errorHandler from "@/lib/error/errorHandler";

export async function GET() {
    const session = await getServerSession(authOptions);

    // Check if a valid session exists
    if (!session) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    // Get the user's ID
    const { id } = session.user;

    if (!id) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    try {
        const businesses = await prisma.customer.findMany({
            where: { userId: id },
            include: { service: true, user: true },
        });
        return NextResponse.json(businesses);
    } catch (error) {
        return errorHandler(error);
    }
}
export async function POST(req: NextRequest) {
    const serviceProfileId = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    // Get the user's ID
    const { id } = session.user;

    if (!id) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    try {
        const existingCustomer = await prisma.customer.findFirst({
            where: { userId: id, serviceProfileId },
        });
        if (existingCustomer) {
            return NextResponse.json("Customer already exists", {
                status: 400,
            });
        }

        const newCustomer = await prisma.customer.create({
            data: { userId: id, serviceProfileId },
        });
        return NextResponse.json(newCustomer, { status: 201 });
    } catch (error) {
        return errorHandler(error);
    }
}
