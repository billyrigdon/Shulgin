import React, { useEffect } from "react";
import Stories from "Components/Stories/Stories";
import { Props } from "Types/Redux";
import axios from "axios";
import { getHeader } from "Auth/AuthHeader";

const API_URL = "http://127.0.0.1:8080/api/protected/";

const Home: React.FC<Props> = (props: Props) => {
	const authHeader = getHeader();

	const getUser = async () => {
		try {
			const response = await axios.get(API_URL + "user", {
				headers: { ...authHeader },
			});
			localStorage.setItem("user", JSON.stringify(response.data));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const user = localStorage.getItem("user");
		if (!user) {
			getUser();
		}
	}, []);

	return (
		<div>
			<Stories />
		</div>
	);
};

export default Home;
