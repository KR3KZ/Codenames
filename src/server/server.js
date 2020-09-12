"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const room_1 = require("./room");
const uuid_1 = require("uuid");
class Server {
    constructor() {
        this.rooms = [];
    }
    findRoomById(uuid) {
        return this.rooms.find((room) => room.uuid === uuid);
    }
    findRoomByCode(code) {
        return this.rooms.find((room) => room.code === code);
    }
    newRoom() {
        const id = uuid_1.v4();
        const room = new room_1.Room(id);
        this.addRoom(room);
        console.log(`Room ${room.uuid} created with code ${room.code}.`);
        return room;
    }
    addRoom(room) {
        this.rooms.push(room);
    }
    joinRoom(roomCode) {
        const room = this.findRoomByCode(roomCode);
        if (room) {
            return room;
        }
        else {
            return false;
        }
    }
}
exports.Server = Server;
