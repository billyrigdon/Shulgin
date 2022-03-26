import { createAction, props } from '@ngrx/store';

export const toggleAddComment = createAction(
	'TOGGLE_ADD_COMMENT',
	props<{ open: boolean }>()
);

export const setParentId = createAction(
	'SET_PARENT',
	props<{parentId: number}>()
)

export const setStoryId = createAction(
	'[Comment] SET_STORY',
	props<{storyId: number}>()
)

export const setStoryContent = createAction(
	'[Comment] SET_STORY_CONTENT',
	props<{content: string}>()
)

export const setParentCommentContent = createAction(
	'[Comment] SET_PARENT_COMMENT_CONTENT',
	props<{content: string}>()
)