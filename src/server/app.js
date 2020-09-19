"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const path_1 = __importDefault(require("path"));
const Server = __importStar(require("./server"));
const socket_io_1 = __importDefault(require("socket.io"));
// Create a new express app instance
const app = express();
const http = http_1.default.createServer(app);
const io = socket_io_1.default(http);
const server = new Server.Server();
app.use(express.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(serve_favicon_1.default(path_1.default.join("public", "img", "favicon.ico")));
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
    }
    else {
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
        }
        else {
            //Send cards with no colors
            res.render("game", {
                uuid: `${req.body.uuid}`,
            });
        }
        io.to(`${req.body.uuid}`).emit("joined", "Someone joined the room");
    }
    else {
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
            console.log(`Socket.io.room ${data} joined by ${socket.conn.remoteAddress}`);
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
