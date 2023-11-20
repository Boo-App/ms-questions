"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
function auth(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(req.headers.email);
    try {
        const decryptToken = (0, jsonwebtoken_1.verify)(token, "shhhhh");
        if (Object.values(decryptToken)[1] === req.headers.email) {
            next();
        }
        else {
            res.status(400).send({ error: "Le token n'est pas valide" });
        }
    }
    catch (e) {
        console.log("la");
        return e;
    }
}
exports.default = auth;
