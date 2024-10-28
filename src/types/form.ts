export interface FormData {
	password: string;
	confirmPassword: string;
	passwordVisible: boolean;
	confirmPasswordVisible: boolean;
}

export interface Field {
	field: "passwordVisible" | "confirmPasswordVisible";
}
