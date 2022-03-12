package controllers

import (
	Auth "shulgin/Auth"
	Models "shulgin/Models"
	Utilities "shulgin/Utilities"
	"time"

	log "github.com/sirupsen/logrus"

	"github.com/gin-gonic/gin"
)

//Uses token to get email, query the database, and return userId for accessing data
func GetUserId(token string) int {
	var userId int
	email, _ := Auth.GetTokenEmail(token)

	db, dbErr := Utilities.ConnectPostgres()
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
	err := db.QueryRow(getUserSql, email).Scan(&userId)
	if err != nil {
		return 0
	}

	return userId
}

//Requires JSON object containing username,email, and password
func UserSignup(context *gin.Context) {

	var user Models.User

	err := context.ShouldBindJSON(&user)
	if err != nil {
		log.Error(err)
		context.JSON(400, gin.H{
			"msg": "invalid json",
		})
		context.Abort()

		return
	}

	//Use bcrypt to generate password hash to save to database
	err = user.HashPassword(user.Password)
	if err != nil {
		log.Error(err)
		context.JSON(500, gin.H{
			"msg": "error hashing password",
		})
		context.Abort()

		return
	}

	//Timestamp in SQL format
	user.DateCreated = time.Now().Format("2006-01-02")

	db, dbErr := Utilities.ConnectPostgres()
	defer db.Close()

	dbErr = db.Ping()
	if dbErr != nil {
		log.Error(dbErr)
	}

	sqlStatement := `
		INSERT INTO users (
			username,
			password,
			email,
			dateCreated
		)
		VALUES ($1,$2,$3,$4);
		`

	_, err = db.Exec(sqlStatement,
		user.Username,
		user.Password,
		user.Email,
		user.DateCreated)

	if err != nil {
		log.Error(err)
		context.JSON(500, gin.H{
			"msg": "error creating user",
		})
		context.Abort()

		return
	}

	tokenResponse := Auth.GetToken(user.Email)
	tokenResponse.Username = user.Username

	//return login token on success
	context.JSON(200, tokenResponse)

}

//Requires email and password in json, returns login token
func UserLogin(context *gin.Context) {
	var payload Models.LoginPayload
	var user Models.User

	err := context.ShouldBindJSON(&payload)
	if err != nil {
		log.Error(err)
		context.JSON(400, gin.H{
			"msg": "invalid json",
		})
		context.Abort()

		return
	}

	db, dbErr := Utilities.ConnectPostgres()
	defer db.Close()

	dbErr = db.Ping()
	if dbErr != nil {
		log.Error(dbErr)
	}

	//Query db using email in payload
	sqlStatement := `
		SELECT username,password
		FROM users
		WHERE email = $1;
	`
	row := db.QueryRow(sqlStatement, payload.Email)

	//Check username
	err = row.Scan(&user.Username, &user.Password)

	if err != nil {
		log.Error(err)
		context.JSON(401, gin.H{
			"msg": "invalid credentials",
		})
		context.Abort()

		return
	}

	//return failure if password doesn't check out
	err = user.CheckPassword(payload.Password)

	if err != nil {
		log.Error(err)
		context.JSON(401, gin.H{
			"msg": "invalid credentials",
		})
		context.Abort()

		return
	}

	tokenResponse := Auth.GetToken(payload.Email)
	tokenResponse.Username = user.Username
	//return login token on success
	context.JSON(200, tokenResponse)

	return
}
