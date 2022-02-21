package models

type UserDrug struct {
	UserDrugId int `json:"userDrugId"`
	UserId int `json:"userId"`
	DrugId int `json:"drugId"`
	DrugName string `json:"drugName"`
	Dosage string `json:"dosage"`
	DateStarted string `json:"dateStarted"`
	DateEnded string `json:"dateEnded"`
}