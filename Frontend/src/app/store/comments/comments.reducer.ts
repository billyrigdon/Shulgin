import { createReducer, on } from '@ngrx/store';
import { toggleAddComment } from './comments.actions';
import { initialState, CommentsState } from './comments.state';

export const _commentsReducer = createReducer(
	initialState,
	on(toggleAddComment, (state, action) => {
		return {
			...state,
			addCommentOpen: action.open,
		};
	})
);
