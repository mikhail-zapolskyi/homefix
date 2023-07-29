const buildQueryObject = (searchParams: URLSearchParams) => {
    const paramsObject = [];
    for (const [key, value] of Array.from(searchParams.entries())) {
        if (key === "rating") {
            paramsObject.push({ [key]: { gte: Number(value) } });
        } else {
            paramsObject.push({ [key]: value });
        }
    }

    let query = {
        where: {},
    };

    // Check if paramsObject array has query. If YES, change query
    if (paramsObject.length !== 0) {
        query = {
            where: {
                AND: paramsObject,
            },
        };
    }

    return query;
};

export default buildQueryObject;
