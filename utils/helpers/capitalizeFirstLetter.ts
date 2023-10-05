/**
 * Converts the first letter of a string to uppercase and replaces underscores with spaces.
 *
 * @param {string} string - The input string to be processed.
 * @returns {string} The processed string.
 */
export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).replace(/_/g, " ");
};
