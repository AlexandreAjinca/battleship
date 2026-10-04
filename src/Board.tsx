import React from "react";

interface SquareProps {
	value: string | null;
	onClick: () => void;
}

interface BoardProps {
	squares: (string | null)[];
	onClick: (index: number) => void;
	size?: number;
}

const Square = ({ value, onClick }: SquareProps) => {
	return (
		<button className="square" onClick={onClick}>
			{value}
		</button>
	);
};

const Board = ({ squares, onClick, size = 8 }: BoardProps) => {
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
			<div key={rowIndex} className="board-row">
				{cells}
			</div>
		);
	}

	return <div>{rows}</div>;
};

export default Board;
