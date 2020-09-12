import express = require("express");
import bodyParser from "body-parser";
import * as Server from "./server";

// Create a new express app instance
const app: express.Application = express();
const server = new Server.Server();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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
  res.render("index", {
    title: "Bienvenue :)",
    message: `Room ${room.uuid} created with code ${room.code}`,
  });
});

app.get("/join", function (req, res) {
  res.render("join", { title: "Hey" });
});

app.get("/join/:roomCode", function (req, res) {
  const room = server.joinRoom(req.params.roomCode);
  if (room) {
    res.render("index", {
      title: "Bienvenue :)",
      message: `Room ${room.uuid} joined with code ${room.code}`,
    });
  }
});

app.listen(3000, function () {
  console.log("App is listening on port 3000!");
});
