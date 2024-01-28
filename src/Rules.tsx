import React from "react";

const Rules = (props) => {
	return (
		<div className="rules">
			<h1>Règles</h1>
			<p>Voici les règles de la bataille navale : </p>
			<p>Au départ, chaque oueur a le même nombre de bateaux qu'il doit placer sur sa grille</p>
			<p>
				Une fois les bateaux placés, chaque joueur attaque chacun son tour en cliquant sur une case
				du plateau
			</p>
			<p>Si l'adversaire avait un bateau sur cette case c'est "TOUCHÉ" sinon c'est "COULÉ"</p>
			<p>La partie se termine lorsqu'un joueur a touché tous les bateaux adverses.</p>
		</div>
	);
};

export default Rules;
