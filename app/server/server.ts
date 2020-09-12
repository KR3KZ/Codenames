import { Room } from "./room";
import { v4 as uuidv4 } from "uuid";

export class Server {
  rooms: Array<Room> = [];

  findRoomByUuid(uuid: string) {
    return this.rooms.find((room) => room.uuid === uuid);
  }

  newRoom() {
    const id = uuidv4();
    const room = new Room(id);
    this.addRoom(room);
    console.log(`Room ${room.uuid} created with uuid ${room.uuid}.`);
    return room;
  }

  addRoom(room: Room) {
    this.rooms.push(room);
  }

  joinRoom(roomUuid: string) {
    const room = this.findRoomByUuid(roomUuid);
    if (room) {
      return room;
    } else {
      return false;
    }
  }
}
