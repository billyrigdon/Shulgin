import { CommentVote } from "./vote";

export type StoryComment = {
	commentId: number;
	storyId: number;
	userId: number;
	parentCommentId: number;
	content: string;
	votes: Array<CommentVote>;
	dateCreated: string;
	updatedAt: string;
	username: string;
}