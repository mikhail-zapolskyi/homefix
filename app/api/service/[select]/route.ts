import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma/prisma";
import { buildQueryObject } from "@/utils";

const getSearchData = async (
    req: NextRequest,
    {
        params,
    }: {
        params: { id: string };
    }
) => {
    const { id } = params;
    const data = await req.json();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    data.userId = id;

    const serviceProfiles = await prisma.serviceProfile.update({
        where: {
            id,
        },
        data,
    });

    return NextResponse.json(serviceProfiles);
};

export { getSearchData as GET };
