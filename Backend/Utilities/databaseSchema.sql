--User tables
CREATE TABLE users (
	userId SERIAL PRIMARY KEY,
	username TEXT,
	password TEXT,
	email TEXT,
	profilePic TEXT,
	dateCreated DATE
);

CREATE UNIQUE INDEX user_email
ON users(email);

-- Stories
CREATE TABLE stories (
	storyId SERIAL PRIMARY KEY,
	userId INT,
	calmness INT,
	focus INT,
	creativity INT,
	irritability INT,
	mood INT,
	wakefulness INT,
	rating INT,
	journal TEXT,
 	date DATE,
	CONSTRAINT fk_userId
		FOREIGN KEY(userId)
			REFERENCES users(userId)
);

--Drug tables
CREATE TABLE drugs (
	drugId SERIAL PRIMARY KEY,
	name TEXT UNIQUE
);

CREATE TABLE user_drugs (
	userDrugId SERIAL PRIMARY KEY,
	userId INT,
	dosage TEXT,
	drugId INT,
	dateStarted DATE,
	dateEnded DATE,
	CONSTRAINT fk_drugId FOREIGN KEY(drugId) REFERENCES drugs(drugId),
	CONSTRAINT fk_userId FOREIGN KEY(userId) REFERENCES users(userId)
);

CREATE UNIQUE INDEX drug_dosage
ON user_drugs(userId,dosage,drugId);


CREATE TABLE user_profile (
	userId INT,
	username TEXT,
	age INT,
	weight INT,
	country TEXT,
	avatar TEXT,
	status TEXT,
	reputation INT,
	funFact TEXT,
	covidVaccine BOOLEAN, 
	smoker BOOLEAN,
	drinker BOOLEAN,
	twoFactor BOOLEAN,
	optOutOfPublicStories BOOLEAN,
	cameraPermission BOOLEAN,
	microphonePermission BOOLEAN,
	notificationPermission BOOLEAN,
	filePermission BOOLEAN,
	nightMode BOOLEAN,
	highContrast BOOLEAN,
	slowInternet BOOLEAN,
	textSize INT,
	screenReader BOOLEAN,
	CONSTRAINT fk_userId
		FOREIGN KEY(userId)
			REFERENCES users(userId)
);

CREATE UNIQUE INDEX profile_userId
ON user_profile(userId);