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

app.get("/game/*", function (req, res) {
  res.send("");
});

app.post("/game*", function (req, res) {
  if (req.body.teamBlue === "checked") {
    console.log("j'existe fdp");
  }
  res.send("");
});

//Last route to redirect bad URL to home page
app.get("*", function (req, res) {
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("App is listening on port 3000!");
});
