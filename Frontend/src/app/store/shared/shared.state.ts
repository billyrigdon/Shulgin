export interface SharedState {
	isLoading: boolean;
	isAuth: boolean;
	userId: number;
}

export const initialState: SharedState = {
	isLoading: false,
	isAuth: false,
	userId: 0,
};
