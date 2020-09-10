import { Team } from "./team";
import { Card } from "./card";

export class Room {
  uuid: string;
  code: string;
  teams: Array<Team> = [];
  cards: Array<Card> = [];
  static Room: any;
  constructor(uuid: string) {
    this.uuid = uuid;
    this.code = this.makeCode(5);
    this.init();
  }
  init() {
    const blueTeam = new Team("BLUE");
    const redTeam = new Team("RED");
    this.teams.push(blueTeam, redTeam);
  }

  makeCode(length: number) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.toUpperCase();
  }
}
