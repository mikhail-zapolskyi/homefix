import getConversations from "@/app/actions/getConversations";
import getCurrentUser from "@/app/actions/getCurrentUser";
import errorHandler from "@/lib/error/errorHandler";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const currentUser = await getCurrentUser();
        let conversations: Record<string, any> = {};

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

            conversations = await getConversations({
                serviceProfileId: serviceProfile?.id,
            });
        } else {
            conversations = await getConversations({
                userId: currentUser.id,
            });
        }

        return NextResponse.json({ conversations });
    } catch (error) {
        return errorHandler(error);
    }
}
