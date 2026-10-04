import React, { useState } from "react";
import "./Settings.css";
import type { Boat } from "./boat.types";

interface SettingsProps {
	boats: Boat[];
	setBoats: React.Dispatch<React.SetStateAction<Boat[]>>;
}

type BoatField = "name" | "size";

const Settings = ({ boats, setBoats }: SettingsProps) => {
	const [boatList, setBoatList] = useState<Boat[]>(() => boats.map((boat) => ({ ...boat })));
	const [text, setText] = useState("");

	function updateValue(
		event: React.ChangeEvent<HTMLInputElement>,
		index: number,
		field: BoatField
	) {
		const value = field === "size" ? Number.parseInt(event.currentTarget.value, 10) : event.currentTarget.value;
		setBoatList((currentBoats) =>
			currentBoats.map((boat, boatIndex) =>
				boatIndex === index ? { ...boat, [field]: value } : boat
			)
		);
		setText(`${event.currentTarget.id} modifié`);
	}

	function addBoat() {
		setBoatList([
			...boatList,
			{
				name: "default",
				size: 1,
			},
		]);
		setText("Bateau ajouté");
	}

	function deleteBoat(index: number) {
		setBoatList((currentBoats) => currentBoats.filter((_, boatIndex) => boatIndex !== index));
		setText("bateau supprimé");
	}

	const listBoat = boatList.map((boat, index) => {
		const idName = "inputName_" + index;
		const idSize = "inputSize_" + index;
		return (
			<li key={index}>
				<div className={`settings_boat_${index}`}>
					<label htmlFor={idName}>Nom : </label>
					<input
						id={idName}
						name={idName}
						onChange={(event) => updateValue(event, index, "name")}
						type="text"
						value={boat.name}
					/>
					<label htmlFor={idSize}>Taille : </label>
					<input
						id={idSize}
						name={idSize}
						onChange={(event) => updateValue(event, index, "size")}
						type="number"
						value={boat.size}
					/>
				</div>
				<button onClick={() => deleteBoat(index)}>Delete</button>
			</li>
		);
	});

	return (
		<div className="settings">
			<h2>Settings</h2>
			<ul>{listBoat}</ul>
			<button id="addBoatButton" onClick={() => addBoat()}>
				Add
			</button>
			<button id="buttonSaveBoats" onClick={() => setBoats(boatList)}>
				Save
			</button>
			<br />
			{text}
		</div>
	);
};

export default Settings;
