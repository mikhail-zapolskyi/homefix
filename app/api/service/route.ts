import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "../../../lib/prisma/prisma";

const getServiceProfile = async (req: NextRequest) => {
    // This block gets query params
    const { searchParams } = new URL(req.url);
    const paramsObject: { [key: string]: string } = {};
    for (const [key, value] of Array.from(searchParams.entries())) {
        paramsObject[key] = value;
    }
    const { name, city, postalCode, address, country, phone, rating } =
        paramsObject;

    let query;
    if (paramsObject) {
        console.log("query");
        query = {
            name,
            city,
            postalCode,
            address,
            country,
            phone,
            rating: Number(rating) || undefined,
        };
    }

    const serviceProfiles = await prisma?.serviceProfile.findMany({
        where: query,
    });

    return NextResponse.json(serviceProfiles);
};

const createServiceProfile = async (req: NextRequest) => {
    const data = await req.json();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    data.userId = session?.user.id;

    try {
        const serviceProfiles = await prisma.serviceProfile.create({
            data,
        });
        return NextResponse.json(serviceProfiles);
    } catch (error) {
        console.error(error);
    }
};

export { getServiceProfile as GET, createServiceProfile as POST };
