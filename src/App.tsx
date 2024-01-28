import React, { useState } from "react";
import jsonBoats from "./data/boats.json";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Game from "./Game.tsx";
import Settings from "./Settings.tsx";
import Rules from "./Rules.tsx";

export const App = (props) => {
	const [board, setBoard] = useState({
		size: 8,
	});
	const [boats, setBoats] = useState(jsonBoats);

	return (
		<Router>
			<div className="App">
				<nav>
					<Link to="/game">Jeu</Link>
					<Link to="/settings">Settings</Link>
					<Link to="/rules">Rules</Link>
				</nav>
				<div className="content">
					<Routes>
						<Route path="/game" element={<Game boats={boats} size={board.size} />} />
						<Route path="/settings" element={<Settings boats={boats} setBoats={setBoats} />} />
						<Route path="/rules" element={<Rules />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
};

export default App;
