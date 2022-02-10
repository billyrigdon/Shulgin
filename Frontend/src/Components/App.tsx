import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import React from "react";
import { getAuth } from "../Auth/AuthService";

const RequireAuth = ({ children, redirectTo }) => {
	const isAuthenticated = getAuth();
	return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route
					path="/"
					element={
						<RequireAuth redirectTo={"/login"}>
							<Home />
						</RequireAuth>
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
