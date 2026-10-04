export interface Boat {
	name: string;
	size: number;
}

export interface GameBoat extends Boat {
	placed: boolean;
}
