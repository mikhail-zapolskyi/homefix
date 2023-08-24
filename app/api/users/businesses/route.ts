import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    const { id } = session.user;

    if (!id) {
        return NextResponse.json("You are not authorized");
    }

    try {
        const businesses = await prisma.customer.findMany({
            where: { userId: id },
            include: { service: true, user: true },
        });
        return NextResponse.json(businesses);
    } catch (error) {
        return NextResponse.error();
    }
}
export async function POST(req: NextRequest) {
    const serviceProfileId = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    const { id } = session.user;

    if (!id) {
        return NextResponse.json("You are not authorized");
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
        return NextResponse.error();
    }
}
