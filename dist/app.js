"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let express = require('express');
const db_1 = __importDefault(require("./config/db"));
const ticket_1 = __importDefault(require("./routes/ticket"));
let dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
(0, db_1.default)();
app.use(express.json());
app.use(function (req, res, next) {
    console.log("origin:");
    console.log(req.headers.origin);
    const origin = req.headers.origin;
    if (req.headers.origin == 'https://mtshby.com') {
        app.use(cors({
            origin: 'https://mtshby.com'
        }));
    }
    if (req.headers.origin == 'http://127.0.0.1:8080') {
        app.use(cors({
            origin: 'http://127.0.0.1:8080'
        }));
    }
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// just for localdev test
app.use(cors({ origin: ["http://localhost:3000", "http://127.0.0.1:8080"] }));
app.use('', ticket_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
