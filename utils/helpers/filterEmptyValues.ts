/**
 * Filter empty or falsy values from an object.
 *
 * This function takes an object as input and returns a new object
 * with only the non-empty or truthy key-value pairs.
 *
 * @param {Record<string, any>} obj - The input object to filter.
 * @returns {Record<string, any>} A new object with non-empty or truthy key-value pairs.
 */
export const filterEmptyValues = (obj: Record<string, any>) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => {
            return (
                (typeof value === "string" && value.trim() !== "") ||
                (Array.isArray(value) && value.length > 0) ||
                (typeof value === "number" && !isNaN(value)) ||
                typeof value === "boolean"
            );
        })
    );
};
