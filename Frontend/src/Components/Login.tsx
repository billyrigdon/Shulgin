import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Auth/AuthService";

const Login: React.FC<any> = (props: any) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const form = useRef(null);

	const handleEmailChange = (e: any) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: any) => {
		setPassword(e.target.value);
	};

	const submitLogin = async (e: any) => {
		e.preventDefault();

		setLoading(true);

		const token = await login(email, password);

		navigate("/", { replace: true });
	};

	return (
		<div id="login-container">
			<p>Hello this is the login page</p>
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
		</div>
	);
};

export default Login;
