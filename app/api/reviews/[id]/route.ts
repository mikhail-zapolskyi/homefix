/**
 * This code defines two functions, `updateServiceProfiles` and `deleteServiceProfile`,
 * which are used to update and delete service profiles, respectively.
 * These functions are designed to work with a Next.js application and
 * integrate with user authentication provided by the NextAuth.js library.
 *
 * @module ServiceProfileHandlers
 * @exports updateServiceProfiles as PUT - Function to update a service profile, requires authentication.
 * @exports deleteServiceProfile as DELETE - Function to delete a service profile, requires authentication.
 *
 * @param {NextRequest} req - The incoming HTTP request object.
 * @param {Object} params - An object containing route parameters, including 'id' for identifying the service profile.
 *
 * @returns {NextResponse} - A Next.js response object, usually in JSON format.
 */

import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "../../../../prisma/client";

const updateServiceProfiles = async (
    req: NextRequest,
    {
        params,
    }: {
        params: { id: string };
    }
) => {
    const { id } = params;
    const data = await req.json();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    const review = await prisma.review.findUnique({
        where: { id },
    });

    if (review?.userId !== session.user.id) {
        return NextResponse.json("incorrect user");
    }

    const serviceProfiles = await prisma.review.update({
        where: {
            id,
        },
        data,
    });

    return NextResponse.json(serviceProfiles);
};

const deleteServiceProfile = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    const { id } = params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    const review = await prisma.review.findUnique({
        where: { id },
    });

    if (review?.userId !== session.user.id) {
        return NextResponse.json("incorrect user");
    }

    try {
        const serviceProfiles = await prisma.review.delete({
            where: {
                id,
            },
            select: {
                id: true,
            },
        });
        return NextResponse.json(serviceProfiles);
    } catch (error) {
        console.error(error);
    }
};

export { updateServiceProfiles as PUT, deleteServiceProfile as DELETE };
