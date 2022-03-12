package controllers

import (
	Models "shulgin/Models"
	Utilities "shulgin/Utilities"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	log "github.com/sirupsen/logrus"
)

func GetAverageMood(context *gin.Context) {
	var story Models.Story
	userId := context.Query("userId")
	storyId := context.Query("storyId")

	db, dbErr := Utilities.ConnectPostgres()
	defer db.Close()

	dbErr = db.Ping()
	if dbErr != nil {
		log.Error(dbErr)
	}

	if userId != "" {
		sqlStatement := `
		SELECT   
			cast(avg(s.calmness) as int) as calmness,
			cast(avg(s.focus) as int) as focus,
			cast(avg(s.creativity) as int) as creativity,
			cast(avg(s.mood) as int) as mood,
			cast(avg(s.irritability) as int) as irritability,
			cast(avg(s.wakefulness) as int) as wakefulness,
			cast(avg(s.rating) as int) as rating
		FROM stories s
		WHERE userId = $1;
		`

		row := db.QueryRow(sqlStatement, userId)

		err := row.Scan(&story.Calmness,
			&story.Focus,
			&story.Creativity,
			&story.Mood,
			&story.Irritability,
			&story.Wakefulness,
			&story.Rating)

		if err != nil {
			log.Error(err)
			context.JSON(500, gin.H{
				"msg": "Error getting stories",
			})
			context.Abort()

			return
		}
	} else if storyId != "" {
		sqlStatement := `
		SELECT   
			cast(avg(s.calmness) as int) as calmness,
			cast(avg(s.focus) as int) as focus,
			cast(avg(s.creativity) as int) as creativity,
			cast(avg(s.mood) as int) as mood,
			cast(avg(s.irritability) as int) as irritability,
			cast(avg(s.wakefulness) as int) as wakefulness,
			cast(avg(s.rating) as int) as rating
		FROM stories s
		WHERE storyId = $1;
		`

		row := db.QueryRow(sqlStatement, storyId)

		err := row.Scan(&story.Calmness,
			&story.Focus,
			&story.Creativity,
			&story.Mood,
			&story.Irritability,
			&story.Wakefulness,
			&story.Rating)

		if err != nil {
			log.Error(err)
			context.JSON(500, gin.H{
				"msg": "Error getting stories",
			})
			context.Abort()

			return
		}
	}

	context.JSON(200, story)
}
