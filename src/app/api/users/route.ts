import { NextResponse } from "next/server";
import Password from "@/utils/bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma/prisma";
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
        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}
