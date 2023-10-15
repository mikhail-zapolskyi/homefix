/*
 * Regular Expression Validators
 * This module provides regular expressions and validation functions for common data formats.
 * You can use these validators to check if user inputs match specific patterns.
 *
 * Regular Expressions:
 * - isEmail: Validates email addresses.
 * - isPostalCode: Validates postal codes (supports various formats).
 * - isStrongPassword: Validates strong passwords with specific criteria.
 * - isPhoneNumber: Validates phone numbers in international format.
 * - isName: Validates names with alphabetical characters and spaces.
 *
 * Validation Functions:
 * - validateEmail(email: string): Checks if an email address is valid.
 * - validatePostalCode(postalCode: string): Checks if a postal code is valid.
 * - validateStrongPassword(password: string): Checks if a password is strong.
 * - validatePhoneNumber(phoneNumber: string): Checks if a phone number is valid.
 * - validatePassword(password: string, confirmPassword: string): Compares two passwords for equality.
 * - validateName(name: string): Checks if a name is valid.
 *
 * Example Usage:
 *
 * // Using the email validator
 * const isValidEmail = validateEmail("user@example.com");
 *
 * // Using the postal code validator
 * const isValidPostalCode = validatePostalCode("12345");
 *
 * // Using the strong password validator
 * const isValidPassword = validateStrongPassword("P@ssw0rd");
 *
 * // Using the phone number validator
 * const isValidPhoneNumber = validatePhoneNumber("+1234567890");
 *
 * // Using the password equality validator
 * const passwordsMatch = validatePassword("password123", "password123");
 *
 * // Using the name validator
 * const isValidName = validateName("John Doe");
 *
 * Note: These validators are based on regular expressions and may not cover all edge cases.
 * It's recommended to combine them with additional checks if necessary.
 */
export const isEmail: RegExp = new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const isPostalCode: RegExp = new RegExp(
    /^((?!.*[DFIOQU])[A-VXY][0-9][A-Z][ -]?[0-9][A-Z][0-9])|(\d{5}$)|(^\d{5}-\d{4})$/,
    "i"
);
export const isStrongPassword: RegExp = new RegExp(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/
);

export const isPhoneNumber: RegExp = new RegExp(/^\+?(?:[0-9] ?){7,14}[0-9]$/);

export const isName: RegExp = new RegExp(/^[a-zA-Z ]{2,30}$/);

// Validation functions
export const validateEmail = (email: string): boolean => {
    return isEmail.test(email);
};

export const validatePostalCode = (postalCode: string): boolean => {
    return isPostalCode.test(postalCode);
};

export const validateStrongPassword = (password: string): boolean => {
    return isStrongPassword.test(password);
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
    return isPhoneNumber.test(phoneNumber);
};

export const validatePassword = (
    password: string,
    confirmPassword: string
): boolean => {
    return password === confirmPassword;
};

export const validateName = (name: string): boolean => {
    return isName.test(name);
};
