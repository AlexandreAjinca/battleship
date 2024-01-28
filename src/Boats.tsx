import React from "react";

const Boats = (props) => {
	const boatList = props.boatList.map((boat, index) => {
		const buttonSelect = boat.placed ? (
			"Placé"
		) : boat === props.selectedBoat ? (
			"Sélectionné"
		) : (
			<button onClick={() => props.onClick(index)}>Sélectionner</button>
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
				<tbody>{boatList}</tbody>
			</table>
		</div>
	);
};

export default Boats;
