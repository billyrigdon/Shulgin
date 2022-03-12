package controllers

import (
	Models "shulgin/Models"
	Utilities "shulgin/Utilities"

	log "github.com/sirupsen/logrus"

	"github.com/gin-gonic/gin"
)

func GetComments(context *gin.Context) {
	
	var comments []Models.StoryComment
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
			sc.dateCreated,
			sc.updatedAt,
			u.username,
			sc.content,
			(select cast(count(*) as int) from comment_votes cv where cv.commentId = sc.commentId ) as votes,
			sc.parentCommentId
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
			&comment.DateCreated,
			&comment.UpdatedAt,
			&comment.Username,
			&comment.Content,
			&comment.Votes,
			&comment.ParentCommentId)

		
		if err = rows.Err(); err != nil {
			log.Error(err)
			context.JSON(500, gin.H{
				"msg": "Error getting comments",
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
		log.Error(dbErr)
	}

	sqlStatementNoParent := `
		INSERT INTO story_comments
			(storyId,userId,content)
		VALUES
			($1,$2,$3)
		RETURNING commentId;
	`

	sqlStatementParent := `
		INSERT INTO story_comments
			(storyId,userId,parentCommentId,content)
		VALUES
			($1,$2,$3,$4)
		RETURNING commentId;
	`

	if comment.ParentCommentId > 0	{
		err := db.QueryRow(sqlStatementParent,
		comment.StoryId,
		comment.UserId,
		comment.ParentCommentId,
		comment.Content).Scan(&comment.CommentId)

		if err != nil {
			log.Error(err)
			context.JSON(500,gin.H{
				"msg": "Couldn't create comment",
			})
			context.Abort()
			return
		}
		
		context.JSON(200,comment)

	} else {
		err := db.QueryRow(sqlStatementNoParent,
		comment.StoryId,
		comment.UserId,
		comment.Content).Scan(&comment.CommentId)

		if err != nil {
			log.Error(err)
			context.JSON(500,gin.H{
				"msg": "Couldn't create comment",
			})
			context.Abort()
			return
		}

		comment.ParentCommentId = 0

		context.JSON(200,comment)
	}
	
}

func UpdateComment(context *gin.Context) {
	var comment Models.StoryComment
	
	//Get userId from token to verify that user owns the comment
	token := context.Request.Header.Get("Authorization")
	userId := GetUserId(token)

	err := context.ShouldBindJSON(&comment)
	if err != nil {
		log.Error(err)
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
		log.Error(dbErr)
	}

	sqlStatement := `
		UPDATE story_comments
		SET content = $1, updatedAt = NOW()
		WHERE commentId = $2
		AND userId = $3
		RETURNING updatedAt;
	`

	err = db.QueryRow(sqlStatement,
		comment.Content,
		comment.CommentId,
		userId).Scan(&comment.UpdatedAt)

	if err != nil {
		log.Error(err)
		context.JSON(500,gin.H{
			"msg": "Couldn't update comment",
		})
		context.Abort()

		return 
	}


	context.JSON(200,comment)
}


func DeleteComment(context *gin.Context) {
	
	commentId := context.Query("commentId")
	
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
		UPDATE story_comments
		SET content = '[ redacted ]',userId = 1
		WHERE commentId = $1
		AND userId = $2;
	`

	_, deleteErr := db.Exec(sqlStatement,commentId,userId)
	if deleteErr != nil {
		log.Error(deleteErr)
		context.JSON(500, gin.H{
			"msg": "Error deleting comment",
		})
		context.Abort()

		return
	}

	context.JSON(200, commentId + " deleted successfully")
}