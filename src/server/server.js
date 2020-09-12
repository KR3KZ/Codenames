"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const room_1 = require("./room");
const uuid_1 = require("uuid");
class Server {
    constructor() {
        this.rooms = [];
    }
    findRoomByUuid(uuid) {
        return this.rooms.find((room) => room.uuid === uuid);
    }
    newRoom() {
        const id = uuid_1.v4();
        const room = new room_1.Room(id);
        this.addRoom(room);
        console.log(`Room ${room.uuid} created with uuid ${room.uuid}.`);
        return room;
    }
    addRoom(room) {
        this.rooms.push(room);
    }
    checkIfRoomExist(roomUuid) {
        const room = this.findRoomByUuid(roomUuid);
        if (room) {
            return room;
        }
        else {
            return false;
        }
    }
}
exports.Server = Server;
