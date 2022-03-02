export interface SharedState {
	isLoading: boolean;
	isAuth: boolean;
}

export const initialState: SharedState = {
	isLoading: false,
	isAuth: false
}