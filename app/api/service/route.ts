import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/prisma/client";
import { buildQueryObject } from "@/utils";
import { Prisma } from "@prisma/client";

const getServiceProfile = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const query = buildQueryObject(searchParams);

    const serviceProfiles = await prisma.location.findMany(query);
    console.log(serviceProfiles);
    return NextResponse.json(serviceProfiles);
};

const createServiceProfile = async (req: NextRequest) => {
    const data = await req.json();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    if (session.user.type === "USER") {
        return NextResponse.json(
            "You are not authorized to create Service Profile. Please register as PRO user"
        );
    }

    data.userId = session.user.id;
    console.log(data.userId);
    try {
        const serviceProfiles = await prisma.serviceProfile.create({
            data: {
                name: data.name,
                phone: data.phone,
                introduction: data.introduction,
                experience: data.experience,
                bio: data.bio,
                specialtiesDo: data.specialtiesDo,
                specialtiesNo: data.specialtiesNo,
                employees: data.employees,
                userId: data.userId,
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
        return NextResponse.json(serviceProfiles);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error);
            if (error.code === "P2002") {
                return NextResponse.json(
                    {
                        message: "User can have only one Service Profile",
                    },
                    { status: 400 }
                );
            }
        }

        console.log(error);
    }
};

export { getServiceProfile as GET, createServiceProfile as POST };
