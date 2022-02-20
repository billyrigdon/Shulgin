import React from "react";
import { useNavigate } from "react-router-dom";
import { Props } from "Types/Redux";

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