import { Player } from "./player";

export class Team {
	name: string;
	color: string | undefined;
	players: Array<Player> = [];
	leader: Player | undefined;
	constructor(name: string) {
		this.name = name;
	}

	setName(name: string) {
		this.name = name;
	}
	setColor(color: string) {
		this.color = color;
	}
}
