import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";

const routs = (
	<React.StrictMode>
		<Router>
			<h1>BATTLESHIP</h1>
			<Routes>
				<Route path="/*" element={<App />} />
			</Routes>
		</Router>
	</React.StrictMode>
);

ReactDOM.render(routs, document.getElementById("root"));
