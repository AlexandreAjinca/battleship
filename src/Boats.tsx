import React from "react";
import type { GameBoat } from "./boat.types";

interface BoatsProps {
	boatList: GameBoat[];
	selectedBoatIndex: number | null;
	onClick: (index: number) => void;
}

const Boats = ({ boatList, selectedBoatIndex, onClick }: BoatsProps) => {
	const boatListRows = boatList.map((boat, index) => {
		const buttonSelect = boat.placed ? (
			"Placé"
		) : index === selectedBoatIndex ? (
			"Sélectionné"
		) : (
			<button onClick={() => onClick(index)}>Sélectionner</button>
		);

		return (
			<tr key={index}>
				<td>{boat.name}</td>
				<td>{boat.size}</td>
				<td>{buttonSelect}</td>
			</tr>
		);
	});
	return (
		<div className="boats">
			<table>
				<thead>
					<tr>
						<th>Nom</th>
						<th>Taille</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{boatListRows}</tbody>
			</table>
		</div>
	);
};

export default Boats;
