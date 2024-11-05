import type React from "react";
import { createContext, useEffect, useState } from "react";

export type UserProps = {
	id_admin: number;
	name: string;
	email: string;
	password: string;
	token: string;
};

type AuthContextProps = {
	user: UserProps | null;
	login: (users: UserProps) => void;
	logout: () => void;
	setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserProps | null>(null);

	useEffect(() => {
		const userStorage = localStorage.getItem("user");

		if (userStorage) {
			const parsedUser = JSON.parse(userStorage);
			setUser(parsedUser);
			console.log(`User loaded from storage: ${parsedUser.name}`);
		}
	}, []);

	const login = (users: UserProps) => {
		setUser(users);
		localStorage.setItem("user", JSON.stringify(users));
		console.log(`user lgoado ${user?.name}`);
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
		console.log("User logged out");
	};

	return (
		<AuthContext.Provider value={{ login, logout, user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
