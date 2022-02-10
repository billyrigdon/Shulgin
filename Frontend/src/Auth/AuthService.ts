import axios from "axios";
const API_URL = "http://127.0.0.1:8080/api/public/";

export const login = async (
	email: string,
	password: string
): Promise<string> => {
	try {
		const config = {
			headers: { "Content-type": "application/json" },
		};

		const { data } = await axios.post(
			API_URL + "login",
			{
				email,
				password,
			},
			config
		);

		if (data.token) {
			localStorage.setItem("token", JSON.stringify(data.token));
		}
		return data.token;
	} catch (error) {
		console.log(error);
	}
	return "";
};

export const logout = () => {
	localStorage.removeItem("token");
};

export const signup = async (
	username: string,
	email: string,
	password: string
): Promise<string> => {
	try {
		const config = {
			headers: { "Content-type": "application/json" },
		};

		const { data } = await axios.post(
			API_URL + "signup",
			{
				username,
				email,
				password,
			},
			config
		);

		return data;
	} catch (error) {
		console.log(error);
	}
	return "";
};

export const getAuth = () => {
	if (localStorage.getItem("token")) {
		return true;
	} else {
		return false;
	}
};
