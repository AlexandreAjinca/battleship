import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App.tsx";

// const routes = (
// 	<React.StrictMode>
// 		<Router>
// 			<Routes>
// 				<Route path="/*" element={<App />} />
// 			</Routes>
// 		</Router>
// 	</React.StrictMode>
// );

ReactDOM.render(<App />, document.getElementById("root"));
