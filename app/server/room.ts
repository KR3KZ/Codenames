import { Team } from "./team";
import { Card } from "./card";

export class Room {
	uuid: string;
	teams: Array<Team> = [];
	cards: Array<Card> = [];
	constructor(uuid: string) {
		this.uuid = uuid;
		this.init();
	}
	init() {
		this.makeTeam();
		this.makeCards();
	}

	makeTeam() {
		const blueTeam = new Team("BLUE");
		blueTeam.setColor("#007bff");
		const redTeam = new Team("RED");
		redTeam.setColor("#cc2d2d");
		const neutralTeam = new Team("NEUTRAL");
		neutralTeam.setColor("#727477");
		this.teams.push(blueTeam, redTeam, neutralTeam);
	}

	makeCards() {}

	getWordList() {}
}
