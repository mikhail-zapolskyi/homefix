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
