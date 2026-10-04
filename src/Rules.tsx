import React from "react";
import "./Rules.css";

const Rules = (props) => {
	return (
		<div className="rules">
			<h1>Règles</h1>
			<p>Au départ, chaque joueur a le même nombre de bateaux qu'il doit placer sur sa grille.</p>
			<p>
				Une fois les bateaux placés, chaque joueur attaque chacun son tour en cliquant sur une case
				du plateau.
			</p>
			<p>
				Si la case touchée contient un bateau, le résultat est{" "}
				<span className="rules-hit">"TOUCHÉ"</span>. Si c'est la dernière case de ce bateau, il est{" "}
				<span className="rules-sunk">"COULÉ"</span>. Si la case est vide, le résultat est{" "}
				<span className="rules-miss">"PLOUF"</span>.
			</p>
			<p>La partie se termine lorsqu'un joueur a coulé tous les bateaux adverses.</p>
		</div>
	);
};

export default Rules;
