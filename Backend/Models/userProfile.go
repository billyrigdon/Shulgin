package models

type UserProfile struct {
	UserId int `json:"userId"`
	Age int `json:"age"`
	Weight int `json:"weight"`
	Country string `json:"country"`
	Avatar string `json:"avatar"`
	Status string `json:"status"`
	Reputation int `json:"reputation"`
	FunFact string `json:"funFact"`
	CovidVaccine bool `json:"covidVaccine"`
	Smoker bool `json:"smoker"`
	Drinker bool `json:"drinker"`
	TwoFactor bool `json:"twoFactor"`
	OptOutOfPublicStories bool `json:"optOutOfPublicStories"`
	CameraPermission bool `json:"cameraPermission"`
	MicrophonePermission bool `json:"microphonePermission"`
	NotificationPermission bool `json:"notificationPermission"`
	FilePermission bool `json:"filePermission"`
	NightMode bool `json:"nightMode"`
	HighContrast bool `json:"highContrast"`
	SlowInternet bool `json:"slowInternet"`
	TextSize int `json:"textSize"`
	ScreenReader bool `json:"screenReader"`
}

// userId,
// age,
// weight,
// country,
// avatar,
// status,
// reputation,
// funFact,
// covidVaccine,
// smoker,
// drinker,
// twoFactor,
// optOutOfPublicStories,
// cameraPermission,
// microphonePermission,
// notificationPermission,
// filePermission,
// nightMode,
// highContrast,
// slowInternet,
// textSize,
// screenReader

// {
// 			"userId":2,
// 			"age": 21,
// 			"weight":125,
// 			"country": "United States",
// 			"avatar": "",
// 			"funFact": "I like to party",
// 			"covidVaccine": true,
// 			"smoker":true,
// 			"drinker":false,
// 			"optOutOfPublicStories":false
// }

// INSERT INTO user_profile 
// 		( 
// 			userId,
// 			age,
// 			weight,
// 			country,
// 			avatar,
// 			reputation,
// 			funFact,
// 			covidVaccine,
// 			smoker,
// 			drinker,
// 			optOutOfPublicStories,
// 			status,
// 			twoFactor,
// 			cameraPermission,
// 			microphonePermission,
// 			notificationPermission,
// 			filePermission,
// 			nightMode,
// 			highContrast,
// 			slowInternet,
// 			textSize,
// 			screenReader)
// 		VALUES	(10,25,125,'us','',0,'',0,0,0,0,'',0,0,0,0,0,0,0,0,16,0);