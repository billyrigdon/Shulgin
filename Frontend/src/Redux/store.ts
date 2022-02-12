import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { State, Action, DispatchType } from "../Types/Redux";

const initialState: State = {
	isLoading: false,
};

//Actions
const toggleLoading = (isLoading: boolean) => {
	return {
		type: "TOGGLE_LOADING",
	};
};

//Reducer and Dispatch
const osReducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case "TOGGLE_LOADING":
			return {
				...state,
				isLoading: !state.isLoading,
			};
		default:
			return state;
	}
};

//Create react store
const store: Store<State, Action> & { dispatch: DispatchType } = createStore(
	osReducer,
	applyMiddleware(thunk)
);

export { store, toggleLoading };
