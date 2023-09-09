import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/prisma/client";
import { buildQueryObject } from "@/utils";
import handlePrismaError from "@/prisma/prismaErrorHandler";

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

    try {
        const serviceProfiles = await prisma.serviceProfile.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                introduction: data.introduction,
                experience: data.experience,
                bio: data.bio,
                specialties_Do: data.specialtiesDo,
                specialties_No: data.specialtiesNo,
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
        return handlePrismaError(error);
    }
};

/**
 * Update a service profile for an authorized professional user.
 * This function handles updating a service profile for a professional user if they are authorized.
 *
 * @param {Request} req - The HTTP request object containing the updated data.
 * @returns {NextResponse} - A response object indicating success or failure.
 */
export async function PUT(req: Request) {
    // Parse the JSON data from the request
    const data = await req.json();
    // Remove properties from the data to prevent it from being updated. Because it throw an error due to incorrect value
    delete data.id;
    delete data.userId;
    delete data.location;
    delete data.businessHours;
    delete data.reviews;
    delete data.posts;
    delete data.categories;
    delete data.customers;

    // Retrieve the user's session to check authorization
    const session = await getServerSession(authOptions);

    // Check if a valid session exists
    if (!session) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    // Get the user from the session
    const user = session.user;

    // Check if the user exists and is of type 'PRO' (professional)
    if (!user || user.type !== "PRO") {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    // Get the user's ID
    const userId = user.id;

    // Check if the user's ID exists
    if (!userId) {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }
    try {
        // Find the service profile associated with the user
        const servPro = await prisma.serviceProfile.findUnique({
            where: {
                userId,
            },
        });

        // Check if the service profile exists
        if (servPro === null) {
            return NextResponse.json(
                {
                    error: "Service profile not found",
                },
                { status: 404 }
            );
        }

        // Update the service profile with the provided data
        const serviceProfiles = await prisma.serviceProfile.update({
            where: {
                id: servPro.id,
            },
            data,
        });

        // Return a JSON response with the updated service profile
        return NextResponse.json(serviceProfiles);
    } catch (error) {
        console.log(error);
        // Handle any errors that occur during the process
        return handlePrismaError(error);
    }
}

export { getServiceProfile as GET, createServiceProfile as POST };
