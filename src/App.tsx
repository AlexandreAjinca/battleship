import React, { useState } from "react";
import jsonBoats from "./data/boats.json";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Game from "./Game";
import Settings from "./Settings";
import Rules from "./Rules";
import type { Boat } from "./boat.types";

export const App = () => {
	const [boats, setBoats] = useState<Boat[]>(jsonBoats);

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
						<Route path="/game" element={<Game boats={boats} size={8} />} />
						<Route path="/settings" element={<Settings boats={boats} setBoats={setBoats} />} />
						<Route path="/rules" element={<Rules />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
};

export default App;
