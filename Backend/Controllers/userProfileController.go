package controllers

import (
	Models "shulgin/Models"
	Utilities "shulgin/Utilities"

	log "github.com/sirupsen/logrus"

	"github.com/gin-gonic/gin"
)

//TODO: Add username to sql queries
func GetUserProfile(context *gin.Context) {
	token := context.Request.Header.Get("Authorization")
	userId := GetUserId(token)
	var user Models.UserProfile

	db, dbErr := Utilities.ConnectPostgres()
	defer db.Close()

	dbErr = db.Ping()
	if dbErr != nil {
		log.Error(dbErr)
	}

	sqlStatement := `
		SELECT 
			userId,
			username,
			age,
			weight,
			country,
			avatar,
			status,
				(SELECT count(*) 
				FROM story_votes 
				WHERE storyId 
				IN (SELECT storyId 
					WHERE userId = $1)) 				
			+
				(SELECT count(*) 
				FROM comment_votes 
				WHERE commentId 
				IN (SELECT commentId 
					FROM story_comments 
					WHERE userId = $1))	
			as reputation,
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

	row := db.QueryRow(sqlStatement, userId)

	err := row.Scan(&user.UserId,
		&user.Username,
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
	context.JSON(200, user)

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

	db, dbErr := Utilities.ConnectPostgres()
	defer db.Close()

	dbErr = db.Ping()
	if dbErr != nil {
		log.Error(dbErr)
	}

	sqlStatement := `
		INSERT INTO user_profile 
		( 
			userId,
			username,
			age,
			weight,
			country,
			avatar,
			reputation,
			funFact,
			covidVaccine,
			smoker,
			drinker,
			optOutOfPublicStories,
			status,
			twoFactor,
			cameraPermission,
			microphonePermission,
			notificationPermission,
			filePermission,
			nightMode,
			highContrast,
			slowInternet,
			textSize,
			screenReader
		)
		VALUES
		(
			$1,
			$2,
			$3,
			$4,
			$5,
			$6,
			0,
			$7,
			$8,
			$9,
			$10,
			$11,
			'',
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			16,
			false
		);
		`

	db.Exec(sqlStatement,
		user.UserId,
		user.Username,
		user.Age,
		user.Weight,
		user.Country,
		user.Avatar,
		user.FunFact,
		user.CovidVaccine,
		user.Smoker,
		user.Drinker,
		user.OptOutOfPublicStories)

	context.JSON(200, user)
}
