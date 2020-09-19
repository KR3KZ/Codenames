"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
class Team {
    constructor(name) {
        this.players = [];
        this.name = name;
    }
    setName(name) {
        this.name = name;
    }
    setColor(color) {
        this.color = color;
    }
}
exports.Team = Team;
