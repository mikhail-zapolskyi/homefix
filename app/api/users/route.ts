import { NextResponse } from "next/server";
import Password from "@/utils/helpers/bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { redirect } from "next/navigation";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    try {
        const users = await prisma.user.findUnique({
            where: {
                email: session?.user?.email,
            },
            select: {
                serviceProfile: true,
            },
        });
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.error();
    }
}

export async function POST(req: Request) {
    const data = await req.json();

    const password = Password.hash(data.password);
    data.password = password;

    try {
        const user = await prisma.user.create({ data });
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return console.error(error);
    }
}
