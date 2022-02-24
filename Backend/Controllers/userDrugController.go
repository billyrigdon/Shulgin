package controllers

import (
	Auth "shulgin/Auth"
	Models "shulgin/Models"
	Utilities "shulgin/Utilities"
	"strconv"
	"time"

	log "github.com/sirupsen/logrus"

	"github.com/gin-gonic/gin"
)

func GetUserDrugs(context *gin.Context) {
	var userDrugs []Models.UserDrug
	token := context.Request.Header.Get("Authorization")
	userId := GetUserId(token)
	
	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()
		
	dbErr = db.Ping()
	if dbErr != nil {
		log.Error(dbErr)
	}

	sqlStatement := `
		SELECT 
			ud.userDrugId,
			ud.userId,
			d.name,
			ud.dosage,
			ud.drugId,
			ud.dateStarted,
			ud.dateEnded
		FROM user_drugs ud
		INNER JOIN drugs d on d.drugId = ud.drugId
		WHERE userId = $1
		AND dateEnded IS NULL;
		`

	rows,err := db.Query(sqlStatement,userId)

	if err != nil {
		log.Error(err)
		context.JSON(500, gin.H{
			"msg": "Error running query",
		})
		context.Abort()

		return
	}

	defer rows.Close()

	for rows.Next() {
		var userDrug Models.UserDrug

		err = rows.Scan(&userDrug.UserDrugId, 
			&userDrug.UserId,
			&userDrug.DrugName,
			&userDrug.Dosage,
			&userDrug.DrugId, 
			&userDrug.DateStarted, 
			&userDrug.DateEnded)

		if err = rows.Err(); err != nil {
			log.Error(err)
			context.JSON(500, gin.H{
				"msg": "Error getting drugs",
			})
			context.Abort()

			return
		}

		userDrugs = append(userDrugs,userDrug)
	}

		context.JSON(200,userDrugs)

}

func AddUserDrug(context *gin.Context) {
	var userDrug Models.UserDrug
	
	err := context.ShouldBindJSON(&userDrug)
	if err != nil {
		log.Error(err)
		context.JSON(400, gin.H{
			"msg": "invalid json",
		})
		context.Abort()

		return
	} 

	userDrug.DateStarted = time.Now().Format("2006-01-02")

	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()

	dbErr = db.Ping()
	if dbErr != nil {
		log.Error(dbErr)
	}

	sqlStatement := `
		INSERT INTO user_drugs (userId,drugId,dosage,dateStarted)
		VALUES ($1,$2,$3,$4)
		RETURNING userDrugId;
	`
	row := db.QueryRow(sqlStatement,userDrug.UserId,userDrug.DrugId,userDrug.Dosage,userDrug.DateStarted)
	err = row.Scan(&userDrug.UserDrugId)
	if err != nil {
		log.Error(err)
		context.JSON(500, gin.H{
			"msg": "unable to insert",
		})
		context.Abort()

		return
	} 
	context.JSON(200,userDrug)
}

func RemoveUserDrug(context *gin.Context) {
	var userId int
	drugId := context.Query("drugId")
	dateEnded := time.Now().Format("2006-01-02")

	token := context.Request.Header.Get("Authorization")
	email,_ := Auth.GetTokenEmail(token)

	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()

	dbErr = db.Ping()
	if dbErr != nil {
		log.Error(dbErr)
	}

	getUserSql := `
		SELECT userId
		FROM users
		WHERE email = $1;
	`
	err := db.QueryRow(getUserSql,email).Scan(&userId)
	if err != nil {
		log.Error(err)
		context.JSON(400, gin.H{
			"msg": "User not found",
		})
		context.Abort()
		
		return
	}


	sqlStatement := `
		UPDATE user_drugs
		SET dateEnded = $1
		WHERE userId = $2
		AND drugId = $3;
	`

	_, updateErr := db.Exec(sqlStatement,dateEnded,userId,drugId)
	if updateErr != nil {
		log.Error(updateErr)
		context.JSON(500, gin.H{
			"msg": "Error removing drug",
		})
		context.Abort()

		return
	}

	context.JSON(200,"DrugId: " + drugId + " removed for userId: " + strconv.Itoa(userId))
}

func GetStoryDrugs(storyId int) ([]Models.UserDrug){
	var drugs []Models.UserDrug

	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()

	dbErr = db.Ping()
	if dbErr != nil {
		log.Error(dbErr)
	}

	sqlStatement := `
		SELECT 
			ud.drugId,
			ud.dosage,
			d.name
		FROM user_drugs ud
		LEFT JOIN drugs d
			ON d.drugId = ud.drugId
		LEFT JOIN stories s
			ON ud.userId = s.userId
		WHERE s.storyId = $1
		AND (ud.dateEnded >= s.date OR ud.dateEnded IS NULL)
		and ud.dateStarted <= s.date;
	`

	rows,err := db.Query(sqlStatement, storyId)

	if err != nil {
		log.Error(err)
		return drugs
	}

	defer rows.Close()

	for rows.Next() {
		var drug Models.UserDrug

		err = rows.Scan(&drug.DrugId,&drug.Dosage,&drug.DrugName)

		if err = rows.Err(); err != nil {
			log.Error(err)
			return drugs
		}

		drugs = append(drugs,drug)
	}

		return drugs
}