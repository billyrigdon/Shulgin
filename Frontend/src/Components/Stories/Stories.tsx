import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getHeader } from "../../Auth/AuthHeader";
import { Props } from "../App/App";
import { Story } from "../../Types/Story";

const API_URL = "http://127.0.0.1:8080/api/protected/";

const Stories = () => {
	const [stories, setStories] = useState<Array<Story>>([]);

	//Get authorization token for protected api calls
	const authHeader = getHeader();

	const getUserStories = async () => {
		const returnedStories = await axios.get(
			API_URL + "story/user?userId=" + "1",
			{
				headers: { ...authHeader },
			}
		);
		console.log(returnedStories);
	};

	useEffect(() => {
		getUserStories();
	}, []);

	return <div></div>;
};

export default Stories;
