import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export function ProtectedRoute() {
	const user = localStorage.getItem("user");

	useEffect(() => {
		if (!user) {
			toast.error("Faça o login e tente novamente", {
				autoClose: 1000,
			});
			console.log(user);
		}
	}, [user]);

	return user ? <Outlet /> : <Navigate to="/login" replace />;
}
