import { createReducer, on } from '@ngrx/store';
import { setParentCommentContent, setParentId, setStoryContent, setStoryId, toggleAddComment } from './comments.actions';
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
	}),
	on(setStoryId, (state, action) => {
		return {
			...state,
			storyId: action.storyId,
		}
	}),
	on(setStoryContent, (state, action) => {
		return {
			...state,
			storyContent: action.content
		}
	}),
	on(setParentCommentContent, (state, action) => {
		return {
			...state,
			parentCommentContent: action.content
		}
	})
);
