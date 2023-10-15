import { Prisma } from "@prisma/client";

interface Location {
    [key: string]: string;
}

interface Category {
    title: string;
}

const buildQueryServPro = (searchParams: URLSearchParams) => {
    const params: Record<string, any> = {};
    const location: Location = {};
    const category: Category = { title: "" };

    for (const [key, value] of Array.from(searchParams.entries())) {
        if (key === "rating") {
            params[key] = { gte: Number(value) };
        } else if (key === "category") {
            category.title = value;
        } else {
            location[key] = value;
        }
    }

    const query: Prisma.ServiceProfileFindManyArgs = {
        where: {
            published: true,
            location:
                Object.keys(location).length > 0
                    ? { every: location }
                    : undefined,
            categories: category.title ? { every: { category } } : undefined,
            ...params,
        },
        include: {
            location: true,
            categories: {
                include: {
                    category: true,
                },
            },
            user: {
                select: {
                    name: true,
                    image: true,
                },
            },
            customers: {
                select: {
                    userId: true,
                },
            },
        },
    };

    return query;
};

export default buildQueryServPro;
