import { Room } from "./room";
import { v4 as uuidv4 } from "uuid";

export class Server {
  rooms: Array<Room> = [];

  findRoomById(uuid: string) {
    return this.rooms.find((room) => room.uuid === uuid);
  }
  findRoomByCode(code: string) {
    return this.rooms.find((room) => room.code === code);
  }

  newRoom() {
    const id = uuidv4();
    const room = new Room(id);
    this.addRoom(room);
    console.log(`Room ${room.uuid} created with code ${room.code}.`);
    return room;
  }

  addRoom(room: Room) {
    this.rooms.push(room);
  }

  joinRoom(roomCode: string) {
    const room = this.findRoomByCode(roomCode);
    if (room) {
      return room;
    } else {
      return false;
    }
  }
}
