import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { getHeader } from "Auth/AuthHeader";
import { Story } from "Types/Story";
import { Props } from "Types/Redux";

const API_URL = "http://127.0.0.1:8080/api/protected/";

const Stories = () => {
	const [stories, setStories] = useState<Array<Story>>([]);

	//Get authorization token for protected api calls
	const authHeader = getHeader();

	const getUserStories = async () => {
		try {
			const localUser = localStorage.getItem("user");
			if (localUser) {
				const user = JSON.parse(localUser);
				const response = await axios.get(
					API_URL + "story/user?userId=" + user.userId,
					{
						headers: { ...authHeader },
					}
				);
				setStories(response.data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUserStories();
	}, []);

	const story = stories.map((item, index) => {
		return (
			<div key={item.storyId}>
				<p>{item.journal}</p>
				<p>{item.date}</p>
			</div>
		);
	});

	return <div>{story}</div>;
};

export default Stories;
