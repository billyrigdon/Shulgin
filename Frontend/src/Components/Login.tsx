import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Auth/AuthService";
import { Props } from "./App";

const Login: React.FC<Props> = (props: Props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const form = useRef(null);

	const handleEmailChange = (e: any) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: any) => {
		setPassword(e.target.value);
	};

	const setLoading = () => {
		props.toggleLoading(props.isLoading);
	};

	const submitLogin = async (e: any) => {
		e.preventDefault();

		setLoading();

		const token = await login(email, password);

		setLoading();

		navigate("/", { replace: true });
	};

	return (
		<form onSubmit={submitLogin} ref={form}>
			<input
				type="email"
				name="email"
				value={email}
				onChange={handleEmailChange}
			></input>
			<input
				type="password"
				name="password"
				value={password}
				onChange={handlePasswordChange}
			></input>
			<button type="submit"></button>
		</form>
	);
};

export default Login;
