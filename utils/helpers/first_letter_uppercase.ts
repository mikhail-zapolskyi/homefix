export const first_letter_uppercase = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).replace("_", " ");
};
