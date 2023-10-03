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
    const session = await getServerSession(authOptions);
    const { serviceProfileId } = await req.json();
    const query: Record<string, any> = {};

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

    query.userId = id;
    query.serviceProfileId = serviceProfileId;

    try {
        const existingCustomer = await prisma.customer.findFirst({
            where: query,
        });

        if (existingCustomer) {
            return NextResponse.json(
                { error: "You already following this account" },
                { status: 400 }
            );
        }

        const newCustomer = await prisma.customer.create({
            data: { userId: id, serviceProfileId: serviceProfileId },
        });

        return NextResponse.json(newCustomer, { status: 201 });
    } catch (error) {
        return errorHandler(error);
    }
}
