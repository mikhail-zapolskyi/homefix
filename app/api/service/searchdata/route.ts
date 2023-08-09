import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

type SearchComposite = {
    categories: string[];
};

const getSearchData = async (req: NextRequest) => {
    const category = prisma.serviceProfile.findMany({
        select: {
            categories: {
                select: {
                    title: true,
                },
                distinct: ["title"],
            },
        },
    });

    const searchComposite: SearchComposite = {
        categories: [],
    };

    const transaction = await prisma.$transaction([category]);

    transaction.forEach((item) => {
        item.map((item) => {
            for (const [key, value] of Object.entries(item)) {
                value.forEach((item: any) => {
                    searchComposite.categories.push(item.title);
                });
            }
        });
    });

    return NextResponse.json(searchComposite);
};

export { getSearchData as GET };
