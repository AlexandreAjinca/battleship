import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Game from "./Game";

test("keeps player 2 boats selectable after player 1 finishes placement", () => {
	const boats = [
		{ name: "porte-avion", size: 5 },
		{ name: "croiseur", size: 4 },
		{ name: "contre-torpilleur", size: 3 },
		{ name: "sous-marin", size: 3 },
		{ name: "torpilleur", size: 2 },
	];
	const { container } = render(<Game boats={boats} size={8} />);
	const placementIndexes = [
		[0, 1, 2, 3, 4],
		[8, 9, 10, 11],
		[16, 17, 18],
		[24, 25, 26],
		[32, 33],
	];

	for (const indexes of placementIndexes) {
		fireEvent.click(screen.getAllByText("Sélectionner")[0]);
		for (const index of indexes) {
			fireEvent.click(container.querySelectorAll(".square")[index]);
		}
	}

	expect(screen.getByText(/Player2/)).toBeTruthy();
	expect(screen.getAllByText("Sélectionner")).toHaveLength(boats.length);
});
