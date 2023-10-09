import getCurrentUser from "@/app/actions/getCurrentUser";
import getUnreadMessages from "@/app/actions/getUnreadMessages";
import errorHandler from "@/lib/error/errorHandler";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const currentUser = await getCurrentUser();
        let total_unread_messages: number | null = 0;

        if (!currentUser) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

        if (currentUser.type === "PRO") {
            const serviceProfile = await prisma?.serviceProfile.findFirst({
                where: {
                    userId: currentUser.id,
                },
            });

            total_unread_messages = await getUnreadMessages({
                serviceProfileId: serviceProfile?.id,
            });
        } else {
            total_unread_messages = await getUnreadMessages({
                userId: currentUser.id,
            });
        }

        return NextResponse.json({ total_unread_messages });
    } catch (error) {
        return errorHandler(error);
    }
}
