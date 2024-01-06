import React, { Component } from "react";

function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
}

class Board extends Component {
	renderSquare(i) {
		return <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
	}

	render() {
		const size = 8;
		const squares = [];
		var row;
		for (let i = 0; i < size; i++) {
			row = [];
			for (let j = 0; j < size; j++) {
				row.push(this.renderSquare(i * size + j));
			}
			squares.push(row);
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
	}
}

export default Board;
