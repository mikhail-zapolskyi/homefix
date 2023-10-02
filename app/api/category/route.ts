import errorHandler from "@/lib/error/errorHandler";
import prisma from "@/prisma/client";

import { NextResponse } from "next/server";

export async function GET() {
    try {
        const categories = await prisma.category.findMany({});
        return NextResponse.json(categories);
    } catch (error) {
        return errorHandler(error);
    }
}
