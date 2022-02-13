package controllers

import (
	Models "shulgin/Models"
	Utilities "shulgin/Utilities"

	log "github.com/sirupsen/logrus"

	"github.com/gin-gonic/gin"
)

func GetUserProfile(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	userId := GetUserId(token)
	var user Models.UserProfile
	
	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()
		
	dbErr = db.Ping()
	if dbErr != nil {
		log.Error(dbErr)
	}
			
	sqlStatement := `
		SELECT 
			userId,
			age,
			weight,
			country,
			avatar,
			status,
			reputation,
			funFact,
			covidVaccine,
			smoker,
			drinker,
			twoFactor,
			optOutOfPublicStories,
			cameraPermission,
			microphonePermission,
			notificationPermission,
			filePermission,
			nightMode,
			highContrast,
			slowInternet,
			textSize,
			screenReader
		FROM user_profile
		WHERE userId = $1;
		`

	row := db.QueryRow(sqlStatement,userId)
			
	err := row.Scan(&user.UserId,
		&user.Age,
		&user.Weight,
		&user.Country,
		&user.Avatar,
		&user.Status,
		&user.Reputation,
		&user.FunFact,
		&user.CovidVaccine,
		&user.Smoker,
		&user.Drinker,
		&user.TwoFactor,
		&user.OptOutOfPublicStories,
		&user.CameraPermission,
		&user.MicrophonePermission,
		&user.NotificationPermission,
		&user.FilePermission,
		&user.NightMode,
		&user.HighContrast,
		&user.SlowInternet,
		&user.TextSize,
		&user.ScreenReader)
			
	if err != nil {
		log.Error(err)
		context.JSON(500, gin.H{
			"msg": "Error getting user profile",
		})
		context.Abort()

		return
	}
	context.JSON(200,user)
	
}

func CreateUserProfile(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	var user Models.UserProfile
	
	err := context.ShouldBindJSON(&user)
	if err != nil {
		log.Error(err)
		context.JSON(400, gin.H{
			"msg": "invalid json",
		})
		context.Abort()

		return
	} 

	user.UserId = GetUserId(token)

	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()
		
	dbErr = db.Ping()
	if dbErr != nil {
		log.Error(dbErr)
	}
			
	sqlStatement := `
		INSERT INTO user_profile 
		( 
			userId,
			age,
			weight,
			country,
			avatar,
			reputation,
			funFact,
			covidVaccine,
			smoker,
			drinker,
			optOutOfPublicStories
		)
		Values
		(
			$1,
			$2,
			$3,
			$4,
			$5,
			$6,
			$7,
			$8,
			$9,
			$10,
			$11
		);
		`

	db.Exec(sqlStatement,
		user.UserId,
		user.Age,
		user.Weight,
		user.Country,
		user.Avatar,
		user.Reputation,
		user.FunFact,
		user.CovidVaccine,
		user.Smoker,
		user.Drinker,
		user.OptOutOfPublicStories)
			

	context.JSON(200,user)
}