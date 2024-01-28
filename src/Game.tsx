import React, { useState } from "react";
import Board from "./Board.tsx";
import Boats from "./Boats.tsx";

const Game = (props: { boats; size }) => {
	const [player1, setPlayer1] = useState({
		name: "Player1",
		boardBoats: Array(props.size ** 2).fill(null),
		boardStrike: Array(props.size ** 2).fill(null),
		boats: props.boats,
	});

	const [player2, setPlayer2] = useState({
		name: "Player2",
		boardBoats: Array(props.size ** 2).fill(null),
		boardStrike: Array(props.size ** 2).fill(null),
		boats: props.boats,
	});

	const [player1Turn, setPlayer1Turn] = useState(true);
	const [placementPhase, setPlacementPhase] = useState(true);
	const [selectedBoat, setSelectedBoat] = useState(null);
	const [indexSelectedBoat, setindexSelectedBoat] = useState(null);
	const [coordSelectedBoat, setcoordSelectedBoat] = useState([]);
	const [message, setmessage] = useState("");

	const handleClick = (i) => {
		const isPlayer1 = player1Turn;
		const player = isPlayer1 ? player1 : player2;

		const isPlacementPhase = placementPhase;
		const board = isPlacementPhase ? player.boardBoats : player.boardStrike;

		if (calculateWinner(board) && !isPlacementPhase) {
			return;
		}

		if (board[i] != null) {
			setmessage("Emplacement occupé!");
			return;
		}

		let message = "";

		if (isPlacementPhase) {
			/*Phase de placement*/
			if (selectedBoat) {
				/*Bateau sélectionné*/
				// console.log("il y a un bateau sélectionné");
				let coords = coordSelectedBoat.slice();
				if (isAligned(coords, i) && isAdjacent(coords, i)) {
					/*La case est alignée avec le reste*/
					// console.log("aligné et adjacent");
					coords.push(i);
					board[i] = selectedBoat.name[0];
					if (coords.length === selectedBoat.size) {
						/*On vient de placer la dernière case du bateau*/
						// console.log("fin du bateau");
						message += "Bateau placé";
						selectedBoat.placed = true;
						coords = [];
						player.boats[indexSelectedBoat] = selectedBoat;
						setSelectedBoat(null);
						setindexSelectedBoat(null);
						console.log("player.boats : " + player.boats);
						let allBoatsPlaced = true;
						for (let i = 0; i < player.boats.length; i++) {
							console.log("playerBoats[i] : " + player.boats[i]);
							if (!player.boats[i].placed) {
								allBoatsPlaced = false;
							}
						}
						if (allBoatsPlaced) {
							console.log("tous les bateaux sont placés");
							setPlayer1Turn(!isPlayer1);

							if (!isPlayer1) {
								setPlacementPhase(!isPlacementPhase);
							}
						}
					}
					player.boardBoats = board;
					setcoordSelectedBoat(coords);
				} else {
					message += "Le point n'est pas aligné ou pas adjacent";
				}
			} else {
				/*Pas de bateau sélectionné*/
				message += "Il faut sélectionner un bateau";
			}
		} else {
			/*Phase d'attaque*/
			const opponent = isPlayer1 ? player2 : player1;
			if (opponent.boardBoats[i] != null) {
				board[i] = "T";
				message += " TOUCHÉ! ";
			} else {
				board[i] = "O";
				message += " PLOUF! ";
			}
			player.boardStrike = board;
			if (calculateWinner(board)) {
				message += player.name + " A GAGNÉ !!!";
			} else {
				setPlayer1Turn(!isPlayer1);
			}
		}

		if (isPlayer1) {
			setPlayer1(player);
			setmessage(message);
		} else {
			setPlayer2(player);
			setmessage(message);
		}

		console.log(message);
	};

	const isAligned = (array, i) => {
		const coords = getCoords(i);
		// console.log("aligné? array : "+ array + " ; i : " + i);
		// console.log("coords(i) : " + coords);
		if (array.length === 0) {
			// console.log("aligné car vide");
			return true;
		} else if (array.length === 1) {
			const coords1 = getCoords(array[0]);
			// console.log("taille 1, coords : "+ coords1 );
			if (coords1[0] === coords[0] || coords1[1] === coords[1]) {
				// console.log("aligné");
				return true;
			}
		} else if (array.length >= 2) {
			const coords1 = getCoords(array[0]);
			const coords2 = getCoords(array[array.length - 1]);
			if (
				(coords1[0] === coords[0] || coords1[1] === coords[1]) &&
				(coords2[0] === coords[0] || coords2[1] === coords[1])
			) {
				// console.log("aligné");
				return true;
			}
		}
		return false;
	};

	const isAdjacent = (array, i) => {
		// console.log("adjacent? array : "+ array + " ; i : " + i);
		if (array.length === 0) {
			// console.log("adjacent car vide");
			return true;
		}
		for (let j = 0; j < array.length; j++) {
			if (
				array[j] === i + 1 ||
				array[j] === i - 1 ||
				array[j] === i + props.size ||
				array[j] === i - props.size
			) {
				// console.log("adjacent");
				return true;
			}
		}
		// console.log("pas adjacent");
		return false;
	};

	const getCoords = (i) => {
		var result = [Math.floor(i / props.size), i % props.size];
		return result;
	};

	const selectBoat = (i) => {
		const isPlayer1 = player1Turn;
		const player = isPlayer1 ? player1 : player2;

		const boats = player.boats.slice();
		const board = player.boardBoats.slice();
		const coords = coordSelectedBoat.slice();
		if (selectedBoat && coords.length > 0) {
			for (let i = 0; i < coords.length; i++) {
				board[coords[i]] = null;
			}
		}
		player.boardBoats = board;
		if (isPlayer1) {
			setPlayer1(player);
			setcoordSelectedBoat([]);
			setSelectedBoat(boats[i]);
			setindexSelectedBoat(i);
		} else {
			setPlayer2(player);
			setcoordSelectedBoat([]);
			setSelectedBoat(boats[i]);
			setindexSelectedBoat(i);
		}
	};

	const calculateWinner = (boardStrike) => {
		let countStrike = 0;
		for (let i = 0; i < boardStrike.length; i++) {
			if (boardStrike[i] === "T") countStrike++;
		}
		if (countStrike === props.boats.map((x) => x.size).reduce((a, b) => a + b)) {
			return true;
		}
		return false;
	};

	const selectedPlayer = player1Turn ? player1 : player2;
	//console.log("selected player : " + selectedPlayer);
	const board = placementPhase ? selectedPlayer.boardBoats : selectedPlayer.boardStrike;
	// console.log("selected player board : " + selectedPlayer.boardBoats);
	// console.log("board : " + board );
	const phase = placementPhase ? "Phase de placement " : " Phase d'attaque ";
	const instruction = selectedBoat ? (
		<div>
			{"Placez ce bateau "} <br />
			<button onClick={() => selectBoat(indexSelectedBoat)}>Réinitialiser bateau</button>
		</div>
	) : placementPhase ? (
		<div>Sélectionner un bateau</div>
	) : (
		<div>Attaquez une case</div>
	);

	return (
		<div className="game">
			<h2>Plateau</h2>
			<div className="game-content">
				<div className="game-board">
					<Board squares={board} onClick={(i) => handleClick(i)} />
				</div>
				<div className="info">
					<Boats
						boatList={selectedPlayer.boats}
						selectedBoat={selectedBoat}
						onClick={(i) => selectBoat(i)}
					/>
					{phase} : {selectedPlayer.name}
					{instruction}
				</div>
			</div>
			{message}
		</div>
	);
};

export default Game;
