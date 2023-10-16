import getCurrentUser from "@/app/actions/getCurrentUser";
import getMessages from "@/app/actions/getMessages";
import { FullMessageType } from "@/app/types";
import errorHandler from "@/lib/error/errorHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    {
        params,
    }: {
        params: { conversationId: string };
    }
) {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json(
                { error: "You are not authorized" },
                { status: 401 }
            );
        }

        if (!conversationId) {
            return NextResponse.json(
                { error: "Invalid conversation ID" },
                { status: 400 }
            );
        }

        const messages = await getMessages(conversationId);

        return NextResponse.json(messages);
    } catch (error) {
        return errorHandler(error);
    }
}
