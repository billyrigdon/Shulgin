import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import React from "react";
import { getAuth } from "../Auth/AuthService";
import { State } from "../Types/ReduxInterface";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { toggleLoading } from "Redux/store";

//Redux config
const mapStateToProps = (state: State) => {
	return {
		isLoading: state.isLoading,
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, Action>) => {
	return {
		toggleLoading: (isLoading: boolean) => {
			dispatch(toggleLoading(isLoading));
		},
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type Props = PropsFromRedux;

//Connect redux state and dispatch to components
const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

//Redirect to protected route if authenticated
const RequireAuth = ({ children, redirectTo }) => {
	const isAuthenticated = getAuth();
	return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/login" element={<ConnectedLogin />} />
				<Route
					path="/"
					element={
						<RequireAuth redirectTo={"/login"}>
							<Home />
						</RequireAuth>
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
