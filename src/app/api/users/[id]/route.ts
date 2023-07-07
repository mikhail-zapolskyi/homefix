import { NextResponse } from "next/server";
import dbConnect from "@/lib/database/mongo";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");
}
