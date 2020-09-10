"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const team_1 = require("./team");
class Room {
    constructor(uuid) {
        this.teams = [];
        this.cards = [];
        this.uuid = uuid;
        this.code = this.makeCode(5);
        this.init();
    }
    init() {
        const blueTeam = new team_1.Team("BLUE");
        const redTeam = new team_1.Team("RED");
        this.teams.push(blueTeam, redTeam);
    }
    makeCode(length) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result.toUpperCase();
    }
}
exports.Room = Room;
