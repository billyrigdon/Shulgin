package models

type CommentVote struct {
	CommentId `json:"commentId"`
	UserId `json:"userId"`
}

type StoryVote struct {
	StoryId `json:"storyId"`
	UserId `json:"storyId"`
}