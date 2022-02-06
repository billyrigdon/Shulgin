package controllers

import (
	"log"

	Models "shulgin/Models"
	Utilities "shulgin/Utilities"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)



func CreateStory(context *gin.Context) {
	
	var story Models.Story
	var storyId int

	err := context.ShouldBindJSON(&story)
	if err != nil {
		context.JSON(400, gin.H{
			"msg": "invalid json",
		})
		context.Abort()

		return
	} 
	
	story.Date = time.Now().Format("2006-01-02")
	

	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()
		
	dbErr = db.Ping()
	if dbErr != nil {
		log.Fatal(dbErr)
	}

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
		context.JSON(500, gin.H{
			"msg": "couldn't create story",
		})
		context.Abort()

		return
	}

	story.StoryId = storyId

	context.JSON(200,story)
	
	return
	
}

func GetUserStories(context *gin.Context) {
	var stories []Models.Story
	userId := context.Query("userId")
	
	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()
		
	dbErr = db.Ping()
	if dbErr != nil {
		log.Fatal(dbErr)
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

func GetSingleStory(context *gin.Context) {
	var story Models.Story
	storyId := context.Query("storyId")
	
	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()
		
	dbErr = db.Ping()
	if dbErr != nil {
		log.Fatal(dbErr)
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
		context.JSON(500, gin.H{
			"msg": "Error getting stories",
		})
		context.Abort()

		return
	}
	context.JSON(200,story)		
}

func DeleteStory(context *gin.Context) {
	storyId := context.Query("storyId")
	token := context.Request.Header.Get("Authorization")
	userId := GetUserId(token)
	
	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()
		
	dbErr = db.Ping()
	if dbErr != nil {
		log.Fatal(dbErr)
	}
	
	sqlStatement := `
		DELETE FROM stories
		WHERE storyId = $1
		AND userid = $2;
		`
	_, deleteErr := db.Exec(sqlStatement,storyId,userId)
	if deleteErr != nil {
		context.JSON(500, gin.H{
			"msg": "Error deleting story",
		})
		context.Abort()

		return
	}

	context.JSON(200, storyId + " deleted successfully")
		
}








