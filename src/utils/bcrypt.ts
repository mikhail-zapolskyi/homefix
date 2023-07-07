import bcrypt from "bcrypt";

interface IPassword {
	hash(password: string): string;
	validate(password: string, comparePassword: string): boolean;
}

const Password: IPassword = {
	hash: (password: string) => {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		return hash;
	},
	validate: (password: string, comparePassword: string) => {
		const isValid = bcrypt.compare(password, comparePassword);
		if (!isValid) {
			return false;
		}

		return true;
	},
};

export default Password;
