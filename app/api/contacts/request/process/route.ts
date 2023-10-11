import errorHandler from "@/lib/error/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: NextRequest) {
    try {
        const data: Record<string, any> = await req.json();
        const currentUser = await getCurrentUser();
        let userId: string | null = null;

        if (
            !data ||
            (data.contactResponse !== "ACCEPTED" &&
                data.contactResponse !== "DECLINED")
        ) {
            console.log(!data);
            console.log(data.contactResponse !== "ACCEPTED");
            console.log(data.contactResponse !== "DECLINED");

            return NextResponse.json(
                { error: "Missing contact response" },
                { status: 401 }
            );
        }

        if (!currentUser) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        } else {
            userId = currentUser.id;
        }

        const serviceProfile = await prisma.serviceProfile.findUnique({
            where: { userId },
        });

        if (!serviceProfile) {
            return NextResponse.json(
                {
                    error: "There is something incorrect. You don't have service profile",
                },
                { status: 401 }
            );
        }

        if (data.contactResponse === "DECLINED") {
            await prisma.contactRequest.update({
                where: {
                    id: data.contactRequestId,
                },
                data: {
                    request_status: data.contactResponse,
                },
            });

            await prisma.conversation.delete({
                where: {
                    id: data.conversationId,
                },
            });

            return NextResponse.json({ msg: "Request was declined" });
        }

        const isContact = await prisma.contact.findFirst({
            where: {
                AND: [{ userId }, { serviceProfileId: serviceProfile.id }],
            },
        });

        if (isContact) {
            return NextResponse.json(
                { error: "This user already in your contact list" },
                { status: 400 }
            );
        }

        await prisma.contact.create({
            data: {
                userId: data.userId,
                serviceProfileId: serviceProfile.id,
            },
        });

        return NextResponse.json({ msg: "Procesed" }, { status: 200 });
    } catch (error) {
        return errorHandler(error);
    }
}
