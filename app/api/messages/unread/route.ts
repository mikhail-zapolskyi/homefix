import getCurrentUser from "@/app/actions/getCurrentUser";
import getUnreadMessages from "@/app/actions/getUnreadMessages";
import errorHandler from "@/lib/error/errorHandler";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

        const total_unread_messages = await getUnreadMessages(currentUser.id);

        return NextResponse.json({ total_unread_messages });
    } catch (error) {
        return errorHandler(error);
    }
}
