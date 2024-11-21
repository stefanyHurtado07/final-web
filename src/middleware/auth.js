"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verificarToken = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).json({ mensaje: "Acceso denegado" });
        return;
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "default_secret");
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).json({ mensaje: "Token inválido" });
    }
};
exports.verificarToken = verificarToken;
