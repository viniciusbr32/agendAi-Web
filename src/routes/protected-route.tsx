import { AuthContext } from "@/contexts/users/auth";
import { createContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
	const user = createContext(AuthContext);

	useEffect(() => {
		if (!user) {
			alert("Usuário não autenticado, redirecionando para login.");
		}
	}, [user]);
	return user ? <Outlet /> : <Navigate to="/login" replace />;
}
