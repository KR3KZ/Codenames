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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Server = __importStar(require("./server"));
const Room = __importStar(require("./room"));
const server = new Server.Server();
let id = 0;
// Create a new express app instance
const app = express();
app.set("views", "app/views");
app.set("view engine", "pug");
app.get("/", function (req, res) {
    res.render("index", { title: "Bienvenue :)", message: `${id} parties en cours.` });
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
