import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { State, Action, DispatchType } from "Types/Redux";

const initialState: State = {
	isLoading: false,
	userId: 0,
};

//Actions
const toggleLoading = (isLoading: boolean) => {
	return {
		type: "TOGGLE_LOADING",
	};
};

const setUserId = (userId: number) => {
	return {
		payloadNum: userId,
		type: "SET_USER",
	};
};

//Reducer and Dispatch
const shulginReducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case "TOGGLE_LOADING":
			return {
				...state,
				isLoading: !state.isLoading,
			}
		case "SET_USER":
			return {
				...state,
				userId: action.payloadNum
			}
		default:
			return state;
	}
};

//Create react store
const store: Store<State, Action> & { dispatch: DispatchType } = createStore(
	shulginReducer,
	applyMiddleware(thunk)
);

export { store, toggleLoading, setUserId };
