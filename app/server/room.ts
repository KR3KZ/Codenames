import { Team } from "./team";
import { Card } from "./card";

export class Room {
  uuid: string;
  teams: Array<Team> = [];
  cards: Array<Card> = [];
  static Room: any;
  constructor(uuid: string) {
    this.uuid = uuid;
    this.init();
  }
  init() {
    const blueTeam = new Team("BLUE");
    const redTeam = new Team("RED");
    this.teams.push(blueTeam, redTeam);
  }
}
