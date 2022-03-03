import { createAction, props } from '@ngrx/store';

export const toggleLoading = createAction(
	'TOGGLE_LOADING',
	props<{ status: boolean }>()
);

export const toggleAuth = createAction(
	'TOGGLE_AUTH',
	props<{ status: boolean }>()
);

export const setUserId = createAction('SET_USER', props<{ userId: number }>());

export const setStoryId = createAction('SET_STORY', props<{ storyId: number }>());
