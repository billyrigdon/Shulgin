export interface CommentsState {
	addCommentOpen: boolean;
	parentCommentId: number;
}

export const initialState: CommentsState = {
	addCommentOpen: false,
	parentCommentId: 0
};
