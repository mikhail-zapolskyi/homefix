import prisma from "@/prisma/client";
import { Password, sendEmail } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const email = await req.json();

        console.log(email);

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email" },
                { status: 400 }
            );
        }
        await sendEmail(email.toString(), "reset");
        return NextResponse.json(
            { message: "Password reset email sent successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const request = await req.json();

        const { token, password } = request;

        console.log(request);

        const user = await prisma.user.findUnique({
            where: {
                forgotPasswordToken: token,
                forgotPasswordTokenExpiry: { gt: new Date(Date.now()) },
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found or invalid token" },
                { status: 400 }
            );
        }

        const hashedPassword = Password.hash(password);

        const data = {
            password: hashedPassword,
            forgotPasswordToken: null,
            forgotPasswordTokenExpiry: null,
        };

        await prisma.user.update({ where: { id: user.id }, data });

        return NextResponse.json(
            { message: "Password changed successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
