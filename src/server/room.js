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
        this.makeTeam();
        this.makeCards();
    }
    makeTeam() {
        const blueTeam = new team_1.Team("BLUE");
        blueTeam.setColor("#007bff");
        const redTeam = new team_1.Team("RED");
        redTeam.setColor("#cc2d2d");
        const neutralTeam = new team_1.Team("NEUTRAL");
        neutralTeam.setColor("#727477");
        this.teams.push(blueTeam, redTeam, neutralTeam);
    }
    makeCards() { }
    getWordList() { }
}
exports.Room = Room;
