"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const team_1 = require("./team");
class Room {
    constructor(uuid) {
        this.teams = [];
        this.cards = [];
        this.uuid = uuid;
        this.init();
    }
    init() {
        const blueTeam = new team_1.Team("BLUE");
        const redTeam = new team_1.Team("RED");
        this.teams.push(blueTeam, redTeam);
    }
}
exports.Room = Room;
