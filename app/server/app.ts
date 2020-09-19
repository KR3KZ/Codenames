import express = require("express");
import httpLib from "http";
import bodyParser from "body-parser";
import favicon from "serve-favicon";
import path from "path";
import * as Server from "./server";
import ioLib from "socket.io";
import { Socket } from "socket.io-client";

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
	const room = server.checkIfRoomExistWithUuid(req.params.roomUuid);
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
	const room = server.checkIfRoomExistWithUuid(req.body.uuid);
	const blueTeamLeader = req.body.teamBlue === "checked" ? true : false;
	const redTeamLeader = req.body.teamRed === "checked" ? true : false;
	if (room) {
		if (blueTeamLeader || redTeamLeader) {
			//Send cards with colors
		} else {
			//Send cards with no colors
			res.render("game", {
				uuid: `${req.body.uuid}`,
			});
		}
		io.to(`${req.body.uuid}`).emit("joined", "Someone joined the room");
	} else {
		res.redirect("/");
	}
});

io.on("connection", (socket) => {
	socket.on("message", (data) => {
		console.log(`Received from client: ${data}`);
	});

	socket.on("uuid", (data) => {
		const room = server.checkIfRoomExistWithUuid(data);
		if (room) {
			console.log(
				`Socket.io.room ${data} joined by ${socket.conn.remoteAddress}`
			);
			socket.join(data);
		}
	});
});

//Last route to redirect bad URL to home page
app.get("*", function (req, res) {
	res.redirect("/");
});

http.listen(3000, function () {
	console.log("App is listening on port 3000!");
});
