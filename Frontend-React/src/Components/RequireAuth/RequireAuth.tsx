import { ProtectedRoute } from "Types/ProtectedRoute";
import { getAuth } from "Auth/AuthService";
import { Navigate } from "react-router-dom";
import React from "react";

//Redirect to protected route if authenticated
const RequireAuth = ({ children, redirectTo }: ProtectedRoute) => {
	const isAuthenticated = getAuth();
	return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;
