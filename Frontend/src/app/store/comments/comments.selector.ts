import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentsState } from './comments.state';

export const COMMENTS_STATE_NAME = 'comments';

const getCommentsState = createFeatureSelector<CommentsState>(COMMENTS_STATE_NAME);

export const getAddCommentsOpen = createSelector(getCommentsState, (state) => {
	return state.addCommentOpen;
});

export const getParentCommentId = createSelector(getCommentsState, (state) => {
	return state.parentCommentId;
});
