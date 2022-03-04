package Controllers

import (
	Models "shulgin/Models"
	Utilities "shulgin/Utilities"

	log "github.com/sirupsen/logrus"

	"github.com/gin-gonic/gin"
	
)

func GetComments(context *gin.Context) {
	
	var comments Models.StoryComment[]
	storyId := context.Query("storyId")

	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()

	dbErr = db.Ping()
	if dbErr != nil {
		log.Error(dbErr)
	}

	sqlStatement := `
		SELECT 
			sc.commentId,
			sc.storyId,
			sc.userId,
			sc.parentCommentId,
			sc.dateCreated,
			sc.updatedAt,
			u.username,
			(select cast(count(*) as int) from comment_votes cv where cv.commentId = sc.commentId ) as votes
		FROM story_comments sc
		LEFT JOIN users u on u.userId = sc.userId
		WHERE sc.storyId = $1;
	`
	rows,err := db.Query(sqlStatement,storyId)

	if err != nil {
		log.Error(err)
		context.JSON(500, gin.H{
			"msg": "Error getting comments",
		})
		context.Abort()

		return
	}

	defer rows.Close()

	for rows.Next() {
		var comment Models.StoryComment

		err = rows.Scan(&comment.CommentId,
			&comment.StoryId,
			&comment.UserId,
			&comment.ParentCommentId,
			&comment.DateCreated,
			&comment.UpdatedAt,
			&comment.Username,
			&comment.Votes)

		if err = rows.Err(); err != nil {
			log.Error(err)
			context.JSON(500, gin.H{
				"msg": "Error getting comments"
			})
			context.Abort()

			return
		}

		comments = append(comments,comment)
	}

	context.JSON(200,comments)
}

func AddComment(context *gin.Context) {
	var comment Models.StoryComment
	
	err := context.ShouldBindJSON(&comment)
	if err != nil {
		log.Error(err)
		context.JSON(400m gin.H{
			"msg": "invalid json"
		})
		context.Abort()

		return
	}

	db, dbErr := Utilities.ConnectPostgres();
	defer db.Close()

	dbErr = db.Ping()
	if dbErr != nil {
		log.Error(dbErr)
	}

	sqlStatement := `
		INSERT INTO story_comments
			(storyId,userId,parentCommentId,content)
		VALUES
			($1,$2,$3,$4)
		RETURNING commentId;
	`

	err = db.QueryRow(sqlStatement,
		comment.StoryId,
		comment.UserId,
		comment.ParentCommentId,
		comment.Content)

	if err != nil {
		log.Error(err)
		context.JSON(500,gin.H{
			"msg": "Couldn't create comment"
		})
		context.Abort()

		return 
	}

	comment.commentId = commentId

	context.JSON(200,comment)
}

