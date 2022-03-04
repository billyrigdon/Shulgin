package models

type StoryComment struct {
	CommentId int `json:"commentId"`
	StoryId int `json:"storyId"`
	ParentCommentId int `json:"parentCommentId"`
	Content int `json:"content"`
	DateCreated string `json:"dateCreated"`
	UpdatedAt string `json:"updatedAt"`,
	Username string `json:"username"`,
	Votes string `json:"votes"`
} 

