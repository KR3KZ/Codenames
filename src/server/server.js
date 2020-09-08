"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
class Server {
    constructor() {
        this.rooms = [];
    }
    findRoomById(id) {
        return this.rooms.find((room) => room.id === id);
    }
}
exports.Server = Server;
