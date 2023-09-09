import { NextResponse } from "next/server";
import Password from "@/utils/helpers/bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { sendEmail } from "@/utils";

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
        const users = await prisma.user.findUnique({
            where: { id },
            include: {
                location: true,
                businesses: true,
            },
        });
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.error();
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
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return NextResponse.json(
                    {
                        message: "Please try another email",
                    },
                    { status: 400 }
                );
            }
        }

        return console.error(error);
    }
}

export async function PUT(req: Request) {
    const data = await req.json();
    const session = await getServerSession(authOptions);

    // Check if a valid session exists
    if (!session) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    // Get the user's ID
    const { id } = session.user;

    // Check if the user's ID exists
    if (!id) {
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
        const user = await prisma.user.update({ where: { id }, data });
        return NextResponse.json(user);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return NextResponse.json(
                    {
                        message: "User not found or you are not authorized",
                    },
                    { status: 400 }
                );
            }
        }

        return console.error(error);
    }
}

export async function DELETE() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    const { id } = session.user;

    if (!id) {
        return NextResponse.json("You are not authorized");
    }

    try {
        const user = await prisma.user.delete({ where: { id } });
        return NextResponse.json(user.id, { status: 200 });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return NextResponse.json(
                    {
                        message: "User not found or you are not authorized",
                    },
                    { status: 400 }
                );
            }
        }

        return console.error(error);
    }
}
