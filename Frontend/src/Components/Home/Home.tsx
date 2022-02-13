import React, { useEffect } from "react";
import Stories from "Components/Stories/Stories";
import { Props } from "Types/Redux";
import axios from "axios";
import { getHeader } from "Auth/AuthHeader";

const API_URL = "http://127.0.0.1:8080/api/protected/";

const Home: React.FC<Props> = (props: Props) => {
	const authHeader = getHeader();

	const fetchUserId = async () => {
		try {
			const response = await axios.get(API_URL + "user", {
				headers: { ...authHeader },
			});
			props.setUserId(response.data);
			localStorage.setItem("userId", response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		if (!userId) {
			fetchUserId();
		}
	}, []);

	return (
		<div>
			<Stories />
		</div>
	);
};

export default Home;
