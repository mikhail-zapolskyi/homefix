import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const token = await req.json();

        console.log(token);

        const user = await prisma.user.findFirst({
            where: {
                verifyToken: token,
                verifyTokenExpiry: { gt: new Date(Date.now()) },
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found or invalid token" },
                { status: 400 }
            );
        }

        const data = {
            emailVerified: true,
            verifyToken: null,
            verifyTokenExpiry: null,
        };

        await prisma.user.update({ where: { id: user.id }, data });

        return NextResponse.json(
            { message: "Email verified succussfully" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
