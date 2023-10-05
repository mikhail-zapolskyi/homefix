/**
 * This code exports a Next.js API route that handles GET requests.
 * It retrieves a list of categories using Prisma ORM and returns them as JSON.
 * If an error occurs during the database query, it is handled by the errorHandler function.
 *
 * @module API/GetCategories
 * @exports GET
 */

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
