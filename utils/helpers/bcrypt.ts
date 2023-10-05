/**
 * Password Utility Module
 *
 * This module provides utility functions for hashing and validating passwords using bcrypt.
 * It exports an object with two methods: `hash` and `validate`.
 * @interface IPassword
 * @method hash - Hashes a plain text password.
 * @method validate - Compares a plain text password with a hashed password to check for validity.
 *
 * @example
 * // Import the Password module
 * import Password from './password';
 *
 * // Hash a password
 * const plainPassword = 'mySecurePassword';
 * const hashedPassword = Password.hash(plainPassword);
 *
 * // Validate a password
 * const isPasswordValid = await Password.validate(plainPassword, hashedPassword);
 * if (isPasswordValid) {
 *     console.log('Password is valid');
 * } else {
 *     console.log('Password is invalid');
 * }
 */

import bcrypt from "bcrypt";

interface IPassword {
    hash(password: string): string;
    validate(password: string, comparePassword: string): Promise<boolean>;
}

const Password: IPassword = {
    hash: (password: string) => {
        const salt = bcrypt.genSaltSync(10);

        const hash = bcrypt.hashSync(password, salt);
        return hash;
    },
    validate: async (password: string, comparePassword: string) => {
        const isValid = await bcrypt.compare(password, comparePassword);

        if (!isValid) {
            return false;
        }

        return true;
    },
};

export default Password;
