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
