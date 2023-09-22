import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { getLocations, getSearchParams } from "@/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";

const getLocation = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const params = getSearchParams(searchParams);
    const locationDir = path.join(process.cwd(), "assets/locations");
    const locations = await getLocations(locationDir, params);
    return NextResponse.json(locations);
};

export async function PUT(req: Request) {
    const data = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "You are not authenticated" });
    }

    const { id } = session.user;
    if (!id) {
        return NextResponse.json({ message: "You are not authorized" });
    }

    if (!data.serviceProfileId) {
        data.userId = id;
    }

    try {
        const existingLocation = await prisma.location.findFirst({
            where: {
                OR: [
                    { userId: data.userId },
                    { serviceProfileId: data.serviceProfileId },
                ],
            },
        });

        if (existingLocation) {
            const updatedLocation = await prisma.location.update({
                where: {
                    id: existingLocation.id,
                },
                data,
            });

            return NextResponse.json(updatedLocation);
        } else {
            const newLocation = await prisma.location.create({
                data,
            });

            return NextResponse.json(newLocation);
        }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                console.log(error.message);
                return NextResponse.json(
                    {
                        message: "Address exist or you are not authorized",
                    },
                    { status: 400 }
                );
            }
        }

        return console.error(error);
    }
}

export { getLocation as GET };
