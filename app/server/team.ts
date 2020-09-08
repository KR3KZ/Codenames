import { Player } from "./player";

export class Team {
  color: string = "";
  players: Array<Player> = [];
  constructor(color: string) {
    this.color = color;
  }
}
