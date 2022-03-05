import { createAction, props } from '@ngrx/store';

export const toggleAddComment = createAction(
	'TOGGLE_ADD_COMMENT',
	props<{ open: boolean }>()
);

export const setParentId = createAction(
	'SET_PARENT',
	props<{parentId: number}>()
)