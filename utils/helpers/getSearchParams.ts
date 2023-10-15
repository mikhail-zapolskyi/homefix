/**
 * Converts a URLSearchParams object into a ParamsObject.
 *
 * @param {URLSearchParams} searchParams - The URLSearchParams object to convert.
 * @returns {ParamsObject} - An object containing key-value pairs from the URLSearchParams.
 *
 * @example
 * const url = new URL('https://example.com/?param1=value1&param2=value2');
 * const searchParams = url.searchParams;
 * const paramsObject = getSearchParams(searchParams);
 * console.log(paramsObject);
 * // Output: { param1: 'value1', param2: 'value2' }
 */

export interface ParamsObject {
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
