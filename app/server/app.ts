import express = require("express");
import httpLib from "http";
import bodyParser from "body-parser";
import favicon from "serve-favicon";
import path from "path";
import * as Server from "./server";
import ioLib from "socket.io";

// Create a new express app instance
const app: express.Application = express();
const http = httpLib.createServer(app);
const io = ioLib(http);
const server = new Server.Server();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(favicon(path.join("public", "img", "favicon.ico")));

app.set("views", "app/views");
app.set("view engine", "pug");

const title = "Codenames";

app.get("/", function (req, res) {
  res.render("index", {
    title: `${title}`,
  });
});

app.get("/new", function (req, res) {
  const room = server.newRoom();
  res.render("new", {
    title: `${title}`,
    message: `Copie le lien pour tes amis 🥰`,
    link: `${req.protocol}://${req.get("host")}/join/${room.uuid}`,
  });
});

app.get("/join/:roomUuid", function (req, res) {
  const room = server.checkIfRoomExist(req.params.roomUuid);
  if (room) {
    res.render("join", {
      title: `${title}`,
      message: `Choisis ton équipe 😊`,
      link: `${req.protocol}://${req.get("host")}/game/${room.uuid}`,
      uuid: `${room.uuid}`,
    });
  } else {
    res.redirect("/");
  }
});

app.get("/game*", function (req, res) {
  res.redirect("/");
});

app.post("/game*", function (req, res) {
  const room = server.checkIfRoomExist(req.body.uuid);
  if (room) {
    res.render("game");
  } else {
    res.redirect("/");
  }

  if (req.body.teamBlue === "checked") {
    console.log("Team blue joined");
  } else if (req.body.teamRed === "checked") {
    console.log("Team red joined");
  }
});

io.on("connection", (socket) => {
  console.log(`${socket.client.conn.remoteAddress}`);
});

//Last route to redirect bad URL to home page
app.get("*", function (req, res) {
  res.redirect("/");
});

http.listen(3000, function () {
  console.log("App is listening on port 3000!");
});
