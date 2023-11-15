import getCurrentUser from "@/app/actions/getCurrentUser";
import errorHandler from "@/lib/error/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import _ from "lodash";

export async function POST(req: NextRequest) {
    try {
        const { title, content, budget, specialties, categories } =
            await req.json();
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

        if (
            _.isEmpty(title) ||
            _.isEmpty(content) ||
            !_.isNumber(budget) ||
            budget <= 0 ||
            _.isEmpty(specialties) ||
            _.isEmpty(categories)
        ) {
            console.log({
                title,
                content,
                budget,
                specialties,
                categories,
            });
            return NextResponse.json(
                {
                    error: "Please ensure your information is filled out and correct before resubmitting your request",
                },
                { status: 400 }
            );
        }
        // NEED TO CREATE FILTER BY CATEGORY AND SPECIALTIES, LOCATION AND RETURN ONLY MATCHED PROFILES
        const serviceProfiles = await prisma.serviceProfile.findMany();

        const project = await prisma.project.create({
            data: {
                title,
                content,
                budget,
                user: {
                    connect: { id: currentUser.id },
                },
                service: {
                    connect: serviceProfiles
                        .filter(
                            (obj) => obj.userId && currentUser.id !== obj.userId
                        )
                        .map((obj) => ({ id: obj.id })),
                },
            },
        });

        return NextResponse.json({ project, status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}
