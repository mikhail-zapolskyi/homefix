import { NextResponse } from "next/server";
import Password from "@/utils/helpers/bcrypt";
import prisma from "@/prisma/client";
import { sendEmail } from "@/utils";
import errorHandler from "@/lib/error/errorHandler";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    try {
        const users = await prisma.user.findUnique({
            where: { id: currentUser.id },
            include: {
                location: true,
                businesses: true,
            },
        });
        return NextResponse.json(users);
    } catch (error) {
        return errorHandler(error);
    }
}

export async function POST(req: Request) {
    const data = await req.json();

    const hashedPassword = Password.hash(data.password);
    data.password = hashedPassword;

    let serviceQuery = {};

    if (data.type === "PRO") {
        serviceQuery = {
            create: {},
        };
    }

    try {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                type: data.type,
                password: data.password,
                serviceProfile: serviceQuery,
                location: {
                    create: {
                        address: data.address,
                        city: data.city,
                        state: data.state,
                        postalCode: data.postalCode,
                        country: data.country,
                        lng: data.lng,
                        lat: data.lat,
                    },
                },
            },
        });

        const email = user.email;

        await sendEmail(email, "verify");
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return errorHandler(error);
    }
}

export async function PUT(req: Request) {
    const data = await req.json();
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    if (data.password) {
        const hashedPassword = Password.hash(data.password);
        data.password = hashedPassword;
    }

    try {
        const user = await prisma.user.update({
            where: { id: currentUser.id },
            data,
        });
        return NextResponse.json(user);
    } catch (error) {
        return errorHandler(error);
    }
}

export async function DELETE() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    try {
        await prisma.user.delete({
            where: { id: currentUser.id },
        });

        return NextResponse.json({}, { status: 204 });
    } catch (error) {
        return errorHandler(error);
    }
}
