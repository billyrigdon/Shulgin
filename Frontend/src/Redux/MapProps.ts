import { setUserId, toggleLoading } from "./Store";
import { State } from "Types/Redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

export const mapStateToProps = (state: State) => {
	return {
		isLoading: state.isLoading,
		userId: state.userId,
	};
};

export const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Action>) => {
	return {
		toggleLoading: (isLoading: boolean) => {
			dispatch(toggleLoading(isLoading));
		},
		setUserId: (userId: number) => {
			dispatch(setUserId(userId));
		},
	};
};
