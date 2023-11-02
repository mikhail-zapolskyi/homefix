import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import errorHandler from "@/lib/error/errorHandler";

export async function GET(
    req: NextRequest,
    {
        params,
    }: {
        params: { id: string };
    }
) {
    const { id } = params;
    console.log(id)
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}
