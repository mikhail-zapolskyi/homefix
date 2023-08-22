import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
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
