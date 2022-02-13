import { Routes, Route } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "Redux/MapProps";
import RequireAuth from "Components/RequireAuth/RequireAuth";
import Login from "Components/Login/Login";
import Home from "Components/Home/Home";
import Signup from "Components/Signup/Signup";
import Splash from "Components/Splash/Splash";


//Connect redux state and dispatch to components
const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
const ConnectedSignup = connect(mapStateToProps, mapDispatchToProps)(Signup);
const ConnectedSplash = connect(mapStateToProps, mapDispatchToProps)(Splash);

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/login" element={<ConnectedLogin />} />
				<Route path="/signup" element={<ConnectedSignup />} />
				<Route path="/splash" element={<ConnectedSplash />} />
				<Route
					path="/"
					element={
						<RequireAuth redirectTo={"/splash"}>
							<Home />
						</RequireAuth>
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
