package controllers

import (
	
	Models "shulgin/Models"
	Utilities "shulgin/Utilities"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	log "github.com/sirupsen/logrus"
)

//Requires json object containing fields for user struct
func CreateStory(context *gin.Context) {
	
	var story Models.Story
	var storyId int

	err := context.ShouldBindJSON(&story)
	if err != nil {
		log.Error(err)
		context.JSON(400, gin.H{
			"msg": "invalid json",
		})
		context.Abort()

		return
	} 

	//Timestamp in postgres format
	story.Date = time.Now().Format("2006-01-02")
	

	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()
		
	dbErr = db.Ping()
	if dbErr != nil {
		log.Error(dbErr)
	}

	//Insert into database and add storyId to story object
	sqlStatement := `
		INSERT INTO stories (
			userid,
			calmness,
			focus,
			creativity,
			mood,
			irritability,
			wakefulness,
			rating,
			journal,
			date
		)
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING storyId;
		`

	err = db.QueryRow(sqlStatement,
		story.UserId,
		story.Calmness,
		story.Focus,
		story.Creativity,
		story.Mood,
		story.Irritability,
		story.Wakefulness,
		story.Rating,
		story.Journal,
		story.Date).Scan(&storyId)

	if err != nil {
		log.Error(err)
		context.JSON(500, gin.H{
			"msg": "couldn't create story",
		})
		context.Abort()

		return
	}

	story.StoryId = storyId

	//Return created story including id and timestamp
	context.JSON(200,story)
	
	return
	
}

//Requires ?userId=, returns array of story Json objects
func GetUserStories(context *gin.Context) {
	
	var stories []Models.Story
	userId := context.Query("userId")
	
	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()
		
	dbErr = db.Ping()
	if dbErr != nil {
		log.Error(dbErr)
	}

	sqlStatement := `
		SELECT storyId, 
		userId, 
		calmness,
		focus,
		creativity,
		mood,
		irritability,
		wakefulness,
		rating,
		journal,
		date
		FROM stories
		WHERE userid = $1;
		`

	rows,err := db.Query(sqlStatement,userId)

	if err != nil {
		log.Error(err)
		context.JSON(500, gin.H{
			"msg": "Error getting stories",
		})
		context.Abort()

		return
	}

	defer rows.Close()

	for rows.Next() {
		var story Models.Story

		err = rows.Scan(&story.StoryId, 
			&story.UserId, 
			&story.Calmness, 
			&story.Focus, 
			&story.Creativity, 
			&story.Mood,
			&story.Irritability, 
			&story.Wakefulness,
			&story.Rating, 
			&story.Journal, 
			&story.Date)

		if err = rows.Err(); err != nil {
			log.Error(err)
			context.JSON(500, gin.H{
				"msg": "Error getting stories",
			})
			context.Abort()

			return
		}

		stories = append(stories,story)
	}

		context.JSON(200,stories)

}

//Requires ?=storyId, returns story Json object
func GetSingleStory(context *gin.Context) {
	var story Models.Story
	storyId := context.Query("storyId")
	
	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()
		
	dbErr = db.Ping()
	if dbErr != nil {
		log.Error(dbErr)
	}
			
	sqlStatement := `
		SELECT storyId, 
		userid, 
		calmness,
		focus,
		creativity,
		mood,
		irritability,
		wakefulness,
		rating,
		journal,
		date
		FROM stories
		WHERE storyId = $1;
		`

	row := db.QueryRow(sqlStatement,storyId)
			
	err := row.Scan( &story.StoryId, 
		&story.UserId, 
		&story.Calmness, 
		&story.Focus, 
		&story.Creativity, 
		&story.Mood,
		&story.Irritability, 
		&story.Wakefulness,
		&story.Rating, 
		&story.Journal, 
		&story.Date)
			
	if err != nil {
		log.Error(err)
		context.JSON(500, gin.H{
			"msg": "Error getting stories",
		})
		context.Abort()

		return
	}
	context.JSON(200,story)		
}

//Requires storyId?=, deletes storyId in Postgres, and returns success message
func DeleteStory(context *gin.Context) {
	storyId := context.Query("storyId")
	//Get userId from token to verify that user owns the story
	token := context.Request.Header.Get("Authorization")
	userId := GetUserId(token)
	
	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()
		
	dbErr = db.Ping()
	if dbErr != nil {
		log.Error(dbErr)
	}
	
	sqlStatement := `
		DELETE FROM stories
		WHERE storyId = $1
		AND userid = $2;
		`
	_, deleteErr := db.Exec(sqlStatement,storyId,userId)
	if deleteErr != nil {
		log.Error(deleteErr)
		context.JSON(500, gin.H{
			"msg": "Error deleting story",
		})
		context.Abort()

		return
	}

	context.JSON(200, storyId + " deleted successfully")
		
}
