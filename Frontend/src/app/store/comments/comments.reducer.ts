import { createReducer, on } from '@ngrx/store';
import { setParentId, toggleAddComment } from './comments.actions';
import { initialState, CommentsState } from './comments.state';

export const _commentsReducer = createReducer(
	initialState,
	on(toggleAddComment, (state, action) => {
		return {
			...state,
			addCommentOpen: action.open,
		};
	}),
	on(setParentId, (state, action) => {
		return {
			...state,
			parentCommentId: action.parentId,
		};
	})
);
