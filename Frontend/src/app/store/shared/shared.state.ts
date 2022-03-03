export interface SharedState {
	isLoading: boolean;
	isAuth: boolean;
	userId: number;
	storyId: number;
}

export const initialState: SharedState = {
	isLoading: false,
	isAuth: false,
	userId: 0,
	storyId: 0,
};
