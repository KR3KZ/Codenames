import express = require("express");
import * as Server from "./server";
import * as Room from "./room";

const bodyParser = require("body-parser");
const server = new Server.Server();
let id = 0;

// Create a new express app instance
const app: express.Application = express();

//TODO, rappelle à illan que c'est un gros shlag - IMPORTANT

app.use(express.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", "app/views");
app.set("view engine", "pug");

app.get("/", function (req, res) {
  res.render("index", {
    title: "Bienvenue :)",
    message: `${id} parties en cours.`,
  });
});

app.get("/new", function (req, res) {
  const room = newRoom();
  id++;
  res.send(`Game ${room.id} créée avec le code ${room.code}`);
});

app.get("/join", function (req, res) {
  res.render("join", { title: "Hey" });
});

app.post("/join", function (req, res) {
  var gameId = req.body.gameId;
  const room = server.findRoomByCode(gameId);
  if (room) {
    res.send(`Game ${room.id} trouvée`);
  } else {
    res.send(`Game ${gameId} non trouvée`);
  }
});

function newRoom() {
  const room = new Room.Room(id);
  server.rooms.push(room);
  console.log(`Room number ${room.id} created with code ${room.code}.`);
  return room;
}

app.listen(3000, function () {
  console.log("App is listening on port 3000!");
});
