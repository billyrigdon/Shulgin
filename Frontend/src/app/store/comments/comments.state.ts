export interface CommentsState {
	addCommentOpen: boolean;
	parentCommentId: number;
	storyId: number;
	storyContent: string;
	parentCommentContent: string;
}

export const initialState: CommentsState = {
	addCommentOpen: false,
	parentCommentId: 0,
	storyId: 0,
	storyContent: "",
	parentCommentContent: ""
};
