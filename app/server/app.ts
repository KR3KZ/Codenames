import express = require("express");
import bodyParser from "body-parser";
import * as Server from "./server";

// Create a new express app instance
const app: express.Application = express();
const server = new Server.Server();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", "app/views");
app.set("view engine", "pug");

app.get("/", function (req, res) {
  res.render("index", {
    title: "Bienvenue :)",
    message: `${JSON.stringify(server.rooms)}`,
  });
});

app.get("/new", function (req, res) {
  const room = server.newRoom();
  server.addRoom(room);
  res.send(`Room ${room.uuid} created with code ${room.code}`);
});

app.get("/join", function (req, res) {
  res.render("join", { title: "Hey" });
});

app.post("/join", function (req, res) {
  var roomUuid = req.body.roomUuid;
  const room = server.findRoomByCode(roomUuid);
  if (room) {
    res.send(`Room ${room.uuid} found with code ${room.code}`);
    console.log(`Someone joined room ${room.uuid}`);
  } else {
    res.send(`Room ${roomUuid} not found`);
  }
});

app.listen(3000, function () {
  console.log("App is listening on port 3000!");
});
