import { createAction, props } from '@ngrx/store';

export const toggleAddComment = createAction(
	'TOGGLE_ADD_COMMENT',
	props<{ open: boolean }>()
);


