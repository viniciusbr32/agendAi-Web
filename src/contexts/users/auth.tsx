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
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserProps | null>(null);

	useEffect(() => {
		const userStorage = localStorage.getItem("user");
		if (userStorage) {
			setUser(JSON.parse(userStorage));
		}
		console.log(userStorage);
	}, []);
	console.log(user);

	const login = (users: UserProps) => {
		setUser(users);
		localStorage.setItem("user", JSON.stringify(users));
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
	};

	return (
		<AuthContext.Provider value={{ login, logout, user }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
