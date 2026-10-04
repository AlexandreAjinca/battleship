import React, { useState } from "react";
import "./Game.css";
import Board from "./Board";
import Boats from "./Boats";
import type { Boat, GameBoat } from "./boat.types";

interface GameProps {
	boats: Boat[];
	size: number;
}

interface Player {
	name: string;
	boardBoats: (string | null)[];
	boardStrike: (string | null)[];
	boats: GameBoat[];
}

const createPlayer = (name: string, boats: Boat[], size: number): Player => ({
	name,
	boardBoats: Array(size ** 2).fill(null),
	boardStrike: Array(size ** 2).fill(null),
	boats: boats.map((boat) => ({ ...boat, placed: false })),
});

const Game = ({ boats, size }: GameProps) => {
	const [player1, setPlayer1] = useState(() => createPlayer("Player1", boats, size));
	const [player2, setPlayer2] = useState(() => createPlayer("Player2", boats, size));
	const [player1Turn, setPlayer1Turn] = useState(true);
	const [placementPhase, setPlacementPhase] = useState(true);
	const [selectedBoat, setSelectedBoat] = useState<GameBoat | null>(null);
	const [indexSelectedBoat, setIndexSelectedBoat] = useState<number | null>(null);
	const [coordSelectedBoat, setCoordSelectedBoat] = useState<number[]>([]);
	const [message, setMessage] = useState("");

	const calculateWinner = (boardStrike: (string | null)[]) => {
		const hits = boardStrike.filter((square) => square === "T").length;
		const fleetSize = boats.reduce((total, boat) => total + boat.size, 0);
		return hits === fleetSize;
	};

	const handleClick = (index: number) => {
		const isPlayer1 = player1Turn;
		const currentPlayer = isPlayer1 ? player1 : player2;

		if (!placementPhase && calculateWinner(currentPlayer.boardStrike)) {
			return;
		}

		const player: Player = {
			...currentPlayer,
			boardBoats: [...currentPlayer.boardBoats],
			boardStrike: [...currentPlayer.boardStrike],
			boats: currentPlayer.boats.map((boat) => ({ ...boat })),
		};
		const board = placementPhase ? player.boardBoats : player.boardStrike;

		if (board[index] !== null) {
			setMessage("Emplacement occupé!");
			return;
		}

		let nextMessage = "";

		if (placementPhase) {
			if (selectedBoat === null || indexSelectedBoat === null) {
				setMessage("Il faut sélectionner un bateau");
				return;
			}

			if (!isAligned(coordSelectedBoat, index) || !isAdjacent(coordSelectedBoat, index)) {
				setMessage("Le point n'est pas aligné ou pas adjacent");
				return;
			}

			const coords = [...coordSelectedBoat, index];
			player.boardBoats[index] = selectedBoat.name.charAt(0);

			if (coords.length === selectedBoat.size) {
				player.boats[indexSelectedBoat] = { ...selectedBoat, placed: true };
				nextMessage = "Bateau placé";
				setSelectedBoat(null);
				setIndexSelectedBoat(null);
				setCoordSelectedBoat([]);

				if (player.boats.every((boat) => boat.placed)) {
					setPlayer1Turn(!isPlayer1);
					if (!isPlayer1) {
						setPlacementPhase(false);
					}
				}
			} else {
				setCoordSelectedBoat(coords);
			}
		} else {
			const opponent = isPlayer1 ? player2 : player1;
			if (opponent.boardBoats[index] !== null) {
				player.boardStrike[index] = "T";
				nextMessage = " TOUCHÉ! ";
			} else {
				player.boardStrike[index] = "O";
				nextMessage = " PLOUF! ";
			}

			if (calculateWinner(player.boardStrike)) {
				nextMessage += `${player.name} A GAGNÉ !!!`;
			} else {
				setPlayer1Turn(!isPlayer1);
			}
		}

		if (isPlayer1) {
			setPlayer1(player);
		} else {
			setPlayer2(player);
		}
		setMessage(nextMessage);
	};

	const getCoords = (index: number): [number, number] => [
		Math.floor(index / size),
		index % size,
	];

	const isAligned = (coords: number[], index: number) => {
		if (coords.length === 0) {
			return true;
		}

		const [row, column] = getCoords(index);
		const [firstRow, firstColumn] = getCoords(coords[0]);
		if (coords.length === 1) {
			return firstRow === row || firstColumn === column;
		}

		const [lastRow] = getCoords(coords[coords.length - 1]);
		return firstRow === lastRow ? row === firstRow : column === firstColumn;
	};

	const isAdjacent = (coords: number[], index: number) => {
		if (coords.length === 0) {
			return true;
		}

		const [row, column] = getCoords(index);
		return coords.some((coord) => {
			const [placedRow, placedColumn] = getCoords(coord);
			return Math.abs(placedRow - row) + Math.abs(placedColumn - column) === 1;
		});
	};

	const selectBoat = (index: number) => {
		const isPlayer1 = player1Turn;
		const currentPlayer = isPlayer1 ? player1 : player2;
		const player = { ...currentPlayer, boardBoats: [...currentPlayer.boardBoats] };

		coordSelectedBoat.forEach((coord) => {
			player.boardBoats[coord] = null;
		});

		if (isPlayer1) {
			setPlayer1(player);
		} else {
			setPlayer2(player);
		}

		setCoordSelectedBoat([]);
		setSelectedBoat(currentPlayer.boats[index]);
		setIndexSelectedBoat(index);
	};

	const selectedPlayer = player1Turn ? player1 : player2;
	const board = placementPhase ? selectedPlayer.boardBoats : selectedPlayer.boardStrike;
	const phase = placementPhase ? "Phase de placement" : "Phase d'attaque";
	const instruction = selectedBoat !== null && indexSelectedBoat !== null ? (
		<div>
			{"Placez ce bateau"} <br />
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
					<Board squares={board} size={size} onClick={handleClick} />
				</div>
				<div className="info">
					<Boats
						boatList={selectedPlayer.boats}
						selectedBoatIndex={indexSelectedBoat}
						onClick={selectBoat}
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
