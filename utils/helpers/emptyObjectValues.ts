/*
    The emptyObjectValues function is a utility function that takes 
    an input object and returns a new object with the same keys as 
    the input object, but with empty string values.
*/

export const emptyObjectValues = (obj: Record<string, any>) => {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, ""])
    );
};
