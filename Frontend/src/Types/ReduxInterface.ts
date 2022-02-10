export interface State {
	isLoading: boolean;
}

export interface Action {
	type: string;
	payload: string;
}

export type DispatchType = (args: Action) => Action;
