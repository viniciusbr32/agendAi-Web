import { Login } from "./components/login";
import { Register } from "./components/register";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export function App() {
	return (
		<Router>
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</Router>
	);
}
