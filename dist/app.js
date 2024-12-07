"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
// middleware
app.use((0, cors_1.default)());
const check = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
app.get('/', check, (req, res, next) => {
    res.send('Testing server');
    next();
});
exports.default = app;
