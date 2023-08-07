import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma/prisma";
import { buildQueryObject } from "@/utils";

const getServiceProfile = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const query = buildQueryObject(searchParams);

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
            data: {
                ...data,
                location: {
                    create: {
                        address: data.address,
                        city: data.city,
                        country: data.country,
                        postal: data.postalCode,
                        long: data.long,
                        lat: data.lat,
                    },
                },
            },
        });

        return NextResponse.json(serviceProfiles);
    } catch (error) {
        console.error(error);
    }
};

export { getServiceProfile as GET, createServiceProfile as POST };
