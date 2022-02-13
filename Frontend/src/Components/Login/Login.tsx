import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "Auth/AuthService";
import { Props } from "Types/Redux";

const Login: React.FC<Props> = (props: Props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const form = useRef(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === "email") {
			setEmail(e.target.value);
		} else if (e.target.name === "password") {
			setPassword(e.target.value);
		}
	};

	const setLoading = () => {
		props.toggleLoading(props.isLoading);
	};

	const submitLogin = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		setLoading();

		const token = await login(email, password);

		setLoading();

		navigate("/", { replace: true });
	};

	return (
		<form onSubmit={submitLogin} ref={form}>
			<label htmlFor="email">Email</label>
			<input
				type="email"
				name="email"
				value={email}
				onChange={handleChange}
			></input>
			<label htmlFor="password">Password</label>
			<input
				type="password"
				name="password"
				value={password}
				onChange={handleChange}
			></input>
			<button type="submit">Submit</button>
		</form>
	);
};

export default Login;
