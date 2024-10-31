export interface FormData {
	email: string;
	username: string;
	password: string;
	passwordVisible: boolean;
	confirmPassword: string;
	confirmPasswordVisible: boolean;
}
export interface FormDataLogin {
	email: string;
	password: string;
	passwordVisible: boolean;
}

export interface Field {
	field: "passwordVisible" | "confirmPasswordVisible";
}

export interface FieldLogin {
	field: "passwordVisible";
}
