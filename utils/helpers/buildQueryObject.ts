const buildQueryObject = (searchParams: URLSearchParams) => {
    const paramsObject: Record<string, any> = {};
    console.log(searchParams);
    for (const [key, value] of Array.from(searchParams.entries())) {
        if (key === "rating") {
            paramsObject[key] = { gte: Number(value) };
        } else {
            paramsObject[key] = value;
        }
    }

    let query = {};

    // Check if paramsObject array has query. If YES, change query
    if (paramsObject.length !== 0) {
        query = {
            where: {
                AND: paramsObject,
            },
            include: {
                service: true,
            },
        };
    } else {
        query = {
            where: {
                NOT: {
                    serviceProfileId: null,
                },
            },
            include: {
                service: true,
            },
        };
    }

    return query;
};

export default buildQueryObject;
