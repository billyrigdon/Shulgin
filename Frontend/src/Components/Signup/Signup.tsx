import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../Auth/AuthService";
import { Props } from "../App/App";

const Signup: React.FC<Props> = (props: Props) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const form = useRef(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === "username") {
			setUsername(e.target.value)
		} else if (e.target.name === "email") {
			setEmail(e.target.value);
		} else if (e.target.name === "password") {
			setPassword(e.target.value)
		}
	};

	const setLoading = () => {
		props.toggleLoading(props.isLoading);
	};

	const submitSignup = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		setLoading();

		const token = await signup(username, email, password);

		setLoading();

		navigate("/", { replace: true });
	};

	return (
		<form onSubmit={submitSignup} ref={form}>
			<input
				type="text"
				name="username"
				value={password}
				onChange={handleChange}
			></input>
			<input
				type="email"
				name="email"
				value={email}
				onChange={handleChange}
			></input>
			<input
				type="password"
				name="password"
				value={password}
				onChange={handleChange}
			></input>
			<button type="submit"></button>
		</form>
	);
};

export default Signup;
