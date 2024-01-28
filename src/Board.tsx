import React from "react";

const Square = (props) => {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
};

const Board = (props) => {
	const renderSquare = (i) => {
		return <Square key={i} value={props.squares[i]} onClick={() => props.onClick(i)} />;
	};

	const size = 8;
	const squares: any[] = [];
	var rows;
	for (let i = 0; i < size; i++) {
		rows = [];
		for (let j = 0; j < size; j++) {
			rows.push(renderSquare(i * size + j));
		}
		squares.push(rows);
	}

	const board = squares.map((row, index) => {
		for (let i = 0; i < size; i++) {
			return (
				<div key={"row" + index} className="board-row">
					{row}
				</div>
			);
		}
	});

	return <div>{board}</div>;
};

export default Board;
