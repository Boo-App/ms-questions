"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const question_1 = require("./../dao/question");
class QuestionService {
    questionDAO = new question_1.QuestionDAO();
    async getQuestion(level, nbQuestion, category) {
        return this.questionDAO.getQuestion(level, nbQuestion, category);
    }
}
exports.QuestionService = QuestionService;
