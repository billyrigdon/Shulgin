import { _sharedReducer } from "./shared/reducers/shared.reducer";
import { SHARED_STATE_NAME } from "./shared/selectors/shared.selector";
import { SharedState } from "./shared/shared.state";

export interface AppState {
	[SHARED_STATE_NAME]: SharedState
}

export const appReducer = {
	[SHARED_STATE_NAME]: _sharedReducer
}