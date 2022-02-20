import { mapStateToProps, mapDispatchToProps } from "Redux/MapProps";
import { connect, ConnectedProps } from "react-redux";

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type Props = PropsFromRedux;

export interface State {
	isLoading: boolean;
	userId: number;
}

export interface Action {
	type: string;
	payload: string;
	payloadNum: number;
}

export type DispatchType = (args: Action) => Action;
