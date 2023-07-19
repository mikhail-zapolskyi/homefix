import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "../../../lib/prisma/prisma";

const getServiceProfile = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);

    // Get all evailable query valuy by extracting it as key, value and to array of objects
    const paramsObject = [];
    for (const [key, value] of Array.from(searchParams.entries())) {
        if (key === "rating") {
            paramsObject.push({ [key]: Number(value) });
        } else {
            paramsObject.push({ [key]: value });
        }
    }

    let query = {
        where: {},
    };
    // Check if paramsObject array has query. If YES change query
    if (paramsObject.length !== 0) {
        query = {
            where: {
                OR: paramsObject,
            },
        };
    }

    const serviceProfiles = await prisma?.serviceProfile.findMany(query);

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
