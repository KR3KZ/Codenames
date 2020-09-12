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
const body_parser_1 = __importDefault(require("body-parser"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const path_1 = __importDefault(require("path"));
const Server = __importStar(require("./server"));
// Create a new express app instance
const app = express();
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
    const room = server.checkIfRoomExist(req.params.roomUuid);
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
app.get("/game/*", function (req, res) {
    res.send("");
});
app.post("/game*", function (req, res) {
    if (req.body.teamBlue === "checked") {
        console.log("Team blue joined");
    }
    else if (req.body.teamRed === "checked") {
        console.log("Team red joined");
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
