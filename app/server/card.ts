import { Team } from "./team";

export class Card {
	text: string;
	team: Team;
	discovered: boolean;
	constructor(text: string, team: Team, discovered: boolean) {
		this.text = text;
		this.team = team;
		this.discovered = discovered;
	}
}
