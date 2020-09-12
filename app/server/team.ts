import { Player } from "./player";

export class Team {
  color: string | undefined;
  players: Array<Player> = [];
  leader: Player | undefined;
  constructor(color: string) {
    this.color = color;
  }
}
