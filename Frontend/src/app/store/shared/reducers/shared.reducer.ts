import {
	Action,
	ActionReducer,
	ActionReducerMap,
	createFeatureSelector,
	createReducer,
	createSelector,
	MetaReducer,
	on,
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { toggleAuth, toggleLoading } from '../actions/shared.actions';
import { initialState, SharedState } from '../shared.state';

export const _sharedReducer = createReducer(
	initialState,
	on(toggleLoading, (state, action) => {
		return {
			...state,
			isLoading: action.status,
		};
	}),
	on(toggleAuth, (state, action) => {
		return {
			...state,
			isAuth: action.status
		}
	})
);
