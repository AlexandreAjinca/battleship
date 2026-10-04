import React from "react";

const Square = (props) => {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
};

const Board = ({ squares, onClick, size = 8 }) => {
	const rows = [];

	for (let rowIndex = 0; rowIndex < size; rowIndex++) {
		const cells = [];
		for (let columnIndex = 0; columnIndex < size; columnIndex++) {
			const index = rowIndex * size + columnIndex;
			cells.push(
				<Square key={index} value={squares[index]} onClick={() => onClick(index)} />
			);
		}
		rows.push(
			<div key={"row" + rowIndex} className="board-row">
				{cells}
			</div>
		);
	}

	return <div>{rows}</div>;
};

export default Board;
