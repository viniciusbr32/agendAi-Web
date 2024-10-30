import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export function App() {
	return (
		<Router>
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</Router>
	);
}
