import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma/prisma";
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

const deleteUsers = async (
    req: Request,
    {
        params,
    }: {
        params: { id: string };
    }
) => {
    const session = await getServerSession(authOptions);
    const id = params;

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    try {
        const user = await prisma.user.delete({ where: id });
        return NextResponse.json(user);
    } catch (error) {
        return console.error(error);
    }
};

export { deleteUsers as DELETE, getUserById as GET };
