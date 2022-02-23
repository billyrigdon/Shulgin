import { createAction, props } from '@ngrx/store';

export const toggleLoading = createAction(
	'TOGGLE_LOADING',
	props<{ status: boolean }>()
);
