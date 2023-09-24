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
