import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { buildQueryServPro } from "@/utils";
import errorHandler from "@/lib/error/errorHandler";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const query = buildQueryServPro(searchParams);

    const serviceProfiles = await prisma.serviceProfile.findMany(query);

    return NextResponse.json(serviceProfiles);
}

export async function POST(req: Request) {
    const data = await req.json();
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.type !== "PRO") {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

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
                userId: currentUser.id,
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
        return errorHandler(error);
    }
}

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

    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.type !== "PRO") {
        return NextResponse.json(
            { error: "You are not authorized" },
            { status: 401 }
        );
    }

    try {
        // Find the service profile associated with the user
        const servPro = await prisma.serviceProfile.findUnique({
            where: {
                userId: currentUser.id,
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
        return errorHandler(error);
    }
}
