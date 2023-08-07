import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

type SearchComposite = {
    cities: string[];
    postalCodes: string[];
    categories: string[];
    countries: string[];
};

const getSearchData = async (req: NextRequest) => {
    const city = prisma.serviceProfile.findMany({
        select: {
            city: true,
        },
        distinct: ["city"],
    });

    const country = prisma.serviceProfile.findMany({
        select: {
            country: true,
        },
        distinct: ["country"],
    });

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
        cities: [],
        postalCodes: [],
        categories: [],
        countries: [],
    };

    const transaction = await prisma.$transaction([city, country, category]);

    transaction.forEach((item) => {
        item.map((item) => {
            for (const [key, value] of Object.entries(item)) {
                if (key === "city") {
                    searchComposite.cities.push(value);
                } else if (key === "country") {
                    searchComposite.countries.push(value);
                } else if (key === "categories") {
                    value.forEach((item: any) => {
                        searchComposite.categories.push(item.title);
                    });
                }
            }
        });
    });

    return NextResponse.json(searchComposite);
};

export { getSearchData as GET };
