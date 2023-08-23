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
        const newCustomer = await prisma.customer.create({
            data: { userId: id, serviceProfileId },
        });
        return NextResponse.json(newCustomer);
    } catch (error) {
        return NextResponse.error();
    }
}
