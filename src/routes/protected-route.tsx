import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const user = localStorage.getItem("user");

	useEffect(() => {
		if (!user) {
			console.log("Usuário não autenticado, redirecionando para login.");
		}
	}, [user]);
	return user ? children : <Navigate to="/login" replace />;
}
