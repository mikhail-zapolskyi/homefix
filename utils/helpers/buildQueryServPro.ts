import { Prisma } from "@prisma/client";

const buildQueryServPro = (searchParams: URLSearchParams) => {
    const params: Record<string, any> = {};
    const location: Record<string, any> = {};
    // const categories: Record<string, any> = {}

    for (const [key, value] of Array.from(searchParams.entries())) {
        if (key === "rating") {
            params[key] = { gte: Number(value) };
        } else {
            location[key] = value;
        }
    }

    let query: Prisma.ServiceProfileFindManyArgs = {
        where: {
            published: true,
            location: {
                every: {},
            },
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
        },
    };

    // Add location filter if applicable
    if (query.where && location) {
        query.where.location = { every: location };
    }

    // Add other filters from params
    if (Object.keys(params).length > 0) {
        query.where = {
            ...query.where,
            ...params,
        };
    }

    return query;
};

export default buildQueryServPro;
