import axios from "axios";
import React, { useState } from "react";
import { Props } from "Types/Redux";
import { AuthHeader } from "Types/AuthHeader";
import { getHeader } from "Auth/AuthHeader";
import { useNavigate } from "react-router-dom";

const API_URL = "http://127.0.0.1:8080/api/protected/user/";

const CreateProfile: React.FC<Props> = (props: Props) => {
	const [age, setAge] = useState(18);
	const [weight, setWeight] = useState(125);
	const [country, setCountry] = useState("USA");
	const [avatar, setAvatar] = useState("");
	const [funFact, setFunFact] = useState("");
	const [covidVaccine, setCovidVaccine] = useState(false);
	const [smoker, setSmoker] = useState(false);
	const [drinker, setDrinker] = useState(false);
	const [optOut, setOptOut] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		switch (e.target.name) {
			case "age": {
				setAge(parseInt(e.target.value));
				break;
			}
			case "weight": {
				setWeight(parseInt(e.target.value));
				break;
			}
			case "country": {
				setCountry(e.target.value);
				break;
			}
			case "avatar": {
				setAvatar(e.target.value);
				break;
			}
			case "funFact": {
				setFunFact(e.target.value);
				break;
			}
			case "covidVaccine": {
				setCovidVaccine(!covidVaccine);
				break;
			}
			case "smoker": {
				setSmoker(!smoker);
				break;
			}
			case "drinker": {
				setDrinker(!drinker);
				break;
			}
			case "optOut": {
				setOptOut(!optOut);
				break;
			}
			default: {
				break;
			}
		}
	};

	const addUserProfile = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		const authHeader = getHeader();

		console.log("Running");

		console.log(authHeader);

		const response = await axios.post(
			API_URL + "create",
			{
				age: age,
				weight: weight,
				country: country,
				avatar: avatar,
				funFact: funFact,
				covidVaccine: covidVaccine,
				smoker: smoker,
				drinker: drinker,
				optOutOfPublicStories: optOut,
			},
			{
				headers: authHeader,
			}
		);

		localStorage.setItem("user", JSON.stringify(response.data));
		navigate("/", { replace: true });
	};

	return (
		<div>
			<form onSubmit={addUserProfile}>
				<label>Age</label>
				<input
					onChange={handleChange}
					name="age"
					type="number"
					value={age}
				></input>
				<label>Weight</label>
				<input
					onChange={handleChange}
					name="weight"
					type="number"
					value={weight}
				></input>
				<label>Country</label>
				<input
					onChange={handleChange}
					name="country"
					type="text"
					value={country}
				></input>
				<label>Avatar</label>
				<input
					onChange={handleChange}
					name="avatar"
					type="text"
					value={avatar}
				></input>
				<label>Fun Fact</label>
				<input
					onChange={handleChange}
					name="funFact"
					type="text"
					value={funFact}
				></input>
				<label>Covid Vaccine?</label>
				<input
					onChange={handleChange}
					name="covidVaccine"
					type="checkbox"
					checked={covidVaccine}
				></input>
				<label>Do you smoke?</label>
				<input
					onChange={handleChange}
					name="smoker"
					type="checkbox"
					checked={smoker}
				></input>
				<label>Are you a drinker?</label>
				<input
					onChange={handleChange}
					name="drinker"
					type="checkbox"
					checked={drinker}
				></input>
				<label>Would you like to keep your stories private?</label>
				<input
					onChange={handleChange}
					name="optOut"
					type="checkbox"
					checked={optOut}
				></input>
				<button type="submit"></button>
			</form>
		</div>
	);
};

export default CreateProfile;
