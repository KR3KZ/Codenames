import { Room } from "./room";

export class Server {
  rooms: Array<Room> = [];

  findRoomById(id: number) {
    return this.rooms.find((room) => room.id === id);
  }
}
