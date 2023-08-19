import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { redirect } from "next/navigation";

const getUserById = async (
    req: NextRequest,
    {
        params,
    }: {
        params: { id: string };
    }
) => {
    const { id } = params;
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        return NextResponse.json(user, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
};

export { getUserById as GET };
