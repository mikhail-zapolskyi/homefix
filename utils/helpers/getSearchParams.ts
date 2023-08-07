interface ParamsObject {
    [key: string]: string;
}

const getSearchParams = (searchParams: URLSearchParams) => {
    const paramsObject: ParamsObject = {};

    for (const [key, value] of Array.from(searchParams.entries())) {
        paramsObject[key] = value;
    }
    return paramsObject;
};

export default getSearchParams;
