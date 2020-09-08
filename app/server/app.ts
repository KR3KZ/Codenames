import express = require("express");
import * as Server from "./server";
import * as Room from "./room";

const server = new Server.Server();
let id = 0;

// Create a new express app instance
const app: express.Application = express();

app.set("views", "app/views");
app.set("view engine", "pug");

app.get("/", function (req, res) {
  res.render("index", { title: "Bienvenue :)", message: `${id} parties en cours.`});
});

app.get("/new", function (req, res) {
  newRoom();
  id++;
  res.send(``);
});

app.get("/join", function (req, res) {
  res.render("index", { title: "Hey", message: "Rejoins une partie !" });
});

function newRoom() {
  const room = new Room.Room(id);
  server.rooms.push(room);
  console.log(`Room number ${room.id} created with code ${room.code}.`);
}

app.listen(3000, function () {
  console.log("App is listening on port 3000!");
});
