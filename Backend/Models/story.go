package models

type Story struct {
	StoryId int `json:"storyId"`
	UserId int `json:"userid"`
	Calmness int `json:"calmness"`
	Focus int `json:"focus"`
	Creativity int `json:"creativity"`
	Mood int `json:"mood"`
	Irritability int `json:"irritability"`
	Wakefulness int `json:"wakefulness"`
	Rating int `json:"rating"`
	Journal string `json:"journal"`
	Date string `json:"date"`
}



// {
// 		"userid": 1,
// 		"calmness": 0,
// 		"focus": 10,
// 		"creativity": 10,
// 		"mood": 8,
// 	"irritability": 6,
// 	"wakefulness": 9,
// 	"rating": 10,
// 	"journal": "ahh yeah"
// }

// {
// 		"userId": 1,
// 		"drugId": 3,
// 		"dosage": "1mg 2x Daily"
// }
