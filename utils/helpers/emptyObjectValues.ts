/**
 * Creates a new object with the same keys as the input object, but with all values set to an empty string.
 *
 * @param {Record<string, any>} obj - The input object.
 * @returns {Record<string, string>} A new object with empty string values.
 */

export const emptyObjectValues = (obj: Record<string, any>) => {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, ""])
    );
};
