import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/users/auth";
import { ProtectedRoute } from "./routes/protected-route";

export function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Router>
		</AuthProvider>
	);
}
