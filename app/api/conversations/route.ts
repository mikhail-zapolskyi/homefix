import getConversations from "@/app/actions/getConversations";
import getCurrentUser from "@/app/actions/getCurrentUser";
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

        const conversations = await getConversations(currentUser.id);

        return NextResponse.json(conversations);
    } catch (error) {
        return errorHandler(error);
    }
}
