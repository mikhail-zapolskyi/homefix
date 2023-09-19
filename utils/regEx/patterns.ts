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
