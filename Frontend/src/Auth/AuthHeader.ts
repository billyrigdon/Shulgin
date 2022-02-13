import { AuthHeader } from "../Types/AuthHeader";

export const getHeader = () => {
	const token = JSON.parse(localStorage.getItem("token") || "");

	const authHeader: AuthHeader = {
		Authorization: "",
		"Content-type": "application/json",
	};

	if (token) {
		authHeader.Authorization = "Bearer " + token;
	}

	return authHeader;
};
