package controllers

import (
	"fmt"
	"log"
	"os"
	Auth "shulgin/Auth"
	Models "shulgin/Models"
	Utilities "shulgin/Utilities"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

//Uses token to get email, query the database, and return userId for accessing data
func GetUserId(token string) int {
	var userId int
	email,_ := Auth.GetTokenEmail(token)

	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()

	dbErr = db.Ping()
	if dbErr != nil {
		log.Fatal(dbErr)
	}

	getUserSql := `
		SELECT userId
		FROM users
		WHERE email = $1;
	`
	err := db.QueryRow(getUserSql,email).Scan(&userId)
	if err != nil {
		return 0	
	}

	return userId
}

//Requires JSON object containing username,email, and password
func UserSignup(context *gin.Context) {
	
	var userId int
	var user Models.User

	err:= context.ShouldBindJSON(&user)
	if err != nil {
		context.JSON(400, gin.H{
			"msg": "invalid json",
		})
		context.Abort()

		return
	}

	//Use bcrypt to generate password hash to save to database
	err = user.HashPassword(user.Password)
	if err != nil {
		context.JSON(500, gin.H{
			"msg": "error hashing password",
		})
		context.Abort()

		return
	}
	
	//Timestamp in SQL format
	user.DateCreated = time.Now().Format("2006-01-02")

	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()

	dbErr = db.Ping()
	if dbErr != nil {
		log.Fatal(dbErr)
	}

	sqlStatement := `
		INSERT INTO users (
			username,
			password,
			email,
			dateCreated
		)
		VALUES ($1,$2,$3,$4) RETURNING userId;
			`
		
	err = db.QueryRow(sqlStatement,
		user.Username,
		user.Password,
		user.Email,
		user.DateCreated).Scan(&userId)

	if err != nil {
		context.JSON(500, gin.H{
			"msg": "error creating user",
		})
		context.Abort()

		return
	}

	user.UserId = userId

	context.JSON(200,user.UserId)

}

//Requires email and password in json, returns login token
func UserLogin(context *gin.Context) {
	var payload Models.LoginPayload
	var user Models.User

	err := context.ShouldBindJSON(&payload)
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

	//Query db using email in payload	
	sqlStatement := `
		SELECT password
		FROM users
		WHERE email = $1;
	`
	row := db.QueryRow(sqlStatement,payload.Email)

	//Check username
	err = row.Scan(&user.Password)

	if err != nil {
		context.JSON(401, gin.H{
			"msg": "invalid credentials",
		})
		context.Abort()

		return
	}

	//return failure if password doesn't check out
	err = user.CheckPassword(payload.Password)

	if err != nil {
		context.JSON(401, gin.H{
			"msg": "invalid credentials",
		})
		context.Abort()
		
		return
	}

	//Load environment variables for secret key and issuer
	err = godotenv.Load(".env")
	if err != nil {
		fmt.Println(err)
	}

	//Generate token and respond with it
	jwtWrapper := Auth.JwtWrapper{
		SecretKey: os.Getenv("secret_key"),
		Issuer: os.Getenv("issuer"),
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(payload.Email)
	if err != nil {
		context.JSON(500, gin.H{
			"msg": "error signing token",
		})
		context.Abort()

		return
	}

	tokenResponse := Models.LoginResponse{
		Token: signedToken,
	}

	//return login token on success
	context.JSON(200,tokenResponse)

	return
}
