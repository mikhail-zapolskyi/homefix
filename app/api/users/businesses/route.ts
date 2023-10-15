import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import errorHandler from "@/lib/error/errorHandler";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    try {
        const businesses = await prisma.customer.findMany({
            where: { userId: currentUser.id },
            include: { service: true, user: true },
        });
        return NextResponse.json(businesses);
    } catch (error) {
        return errorHandler(error);
    }
}
export async function POST(req: NextRequest) {
    const { serviceProfileId } = await req.json();
    const query: Record<string, any> = {};
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    query.userId = currentUser.id;
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
            data: {
                userId: currentUser.id,
                serviceProfileId: serviceProfileId,
            },
        });

        return NextResponse.json(newCustomer, { status: 201 });
    } catch (error) {
        return errorHandler(error);
    }
}
