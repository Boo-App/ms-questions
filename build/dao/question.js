"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionDAO = void 0;
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
const shuffle_list_1 = __importDefault(require("shuffle-list"));
const db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config("Questions", true, false, "/"));
class QuestionDAO {
    async getQuestion(level, nbQuestion, category) {
        const getQuestion = db.getData("questions/");
        const questions = getQuestion.questions.filter((question) => question.category === category && question.level === level);
        const shuffle = (0, shuffle_list_1.default)(questions);
        return shuffle.slice(0, nbQuestion);
    }
}
exports.QuestionDAO = QuestionDAO;
