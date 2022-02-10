package controllers

import (
	"log"
	Models "shulgin/Models"
	Utilities "shulgin/Utilities"

	"github.com/gin-gonic/gin"
)

//Requires ?drugId= , returns drug name and id
func GetDrug(context *gin.Context) {
	var drug Models.Drug
	drugId := context.Query("drugId")

	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()

	dbErr = db.Ping()
	if dbErr != nil {
		log.Fatal(dbErr)
	}

	sqlStatement := `
		SELECT drugid,name
		FROM drugs
		WHERE drugid = $1;
	`
	err := db.QueryRow(sqlStatement,drugId).Scan(&drug.DrugId,&drug.Name)
	if err != nil {
		context.JSON(400, gin.H{
			"msg": "drug not found",
		})
		context.Abort()
		
		return
	}
	context.JSON(200,drug)
}


//requires "name" json object,inserts into database, and returns generated drugId
func AddDrug(context *gin.Context) {
	var drug Models.Drug
	
	err := context.ShouldBindJSON(&drug)
	if err != nil {
		context.JSON(400, gin.H{
			"msg": "invalid json",
		})
		context.Abort()

		return
	} 

	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()

	dbErr = db.Ping()
	if dbErr != nil {
		log.Fatal(dbErr)
	}

	sqlStatement := `
		INSERT INTO drugs
			(name) 
		VALUES
			($1)
		RETURNING drugId;
	`
	err = db.QueryRow(sqlStatement,drug.Name).Scan(&drug.DrugId)
	if err != nil {
		context.JSON(400, gin.H{
			"msg": "drug not found",
		})
		context.Abort()
		
		return
	}

	context.JSON(200,drug)

}

