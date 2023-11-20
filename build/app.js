"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require("express");
const express_1 = __importDefault(require("express"));
const question_1 = require("./service/question");
const app = (0, express_1.default)();
const cors = require("cors");
require("dotenv").config();
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
const auth_1 = __importDefault(require("./middleware/auth"));
const db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config("Questions", true, false, "/"));
const questionService = new question_1.QuestionService();
app.use(cors());
app.use(express_1.default.json());
const categories = ["Divers", "Mathematiques"];
const levels = ["Facile", "Difficile"];
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization, email");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
//TODO l'auth ne renvois rien si le token est pas bon
app.get("/", (req, res) => {
    //db.push("/questions[]", question, true)
    res.status(200).send({ message: "Salut" });
});
app.get("/questions", auth_1.default, async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    try {
        const getQuestion = await questionService.getQuestion(req.query.level, req.query.nbQuestion, req.query.category);
        res.status(200).send(getQuestion);
    }
    catch (e) {
        res.status(400).send(e);
    }
});
app.get("/categories", (req, res) => {
    res.status(200).send(categories);
});
app.get("/levels", (req, res) => {
    res.status(200).send(levels);
});
app.listen(process.env.PORT || 5000, () => {
    console.log("Server app listening on port 5000");
});
