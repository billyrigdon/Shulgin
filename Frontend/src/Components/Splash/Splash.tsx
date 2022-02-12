import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../Auth/AuthService";
import { Props } from "../App/App";

const Splash: React.FC<Props> = (props: Props) => {

	const navigate = useNavigate();

	return (
		<div id="splash-container">
			<button
				onClick={() => {
					navigate("/signup", { replace: true });
				}}
			>
				Signup
			</button>
			<button
				onClick={() => {
					navigate("/login", { replace: true });
				}}
			>
				Login
			</button>
		</div>
	);
}

export default Splash;