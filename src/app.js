"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var db_1 = require("./config/db");
var ticket_1 = require("./routes/ticket");
var dotenv = require('dotenv');
var cors = require('cors');
dotenv.config();
var app = express();
var PORT = process.env.PORT || 5000;
(0, db_1.default)();
app.use(express.json());
app.use(function (req, res, next) {
    console.log("origin:");
    console.log(req.header.origin);
    var origin = req.header.origin;
    if (req.header.origin == 'https://mtshby.com') {
        app.use(cors({
            origin: 'https://mtshby.com'
        }));
    }
    if (req.header.origin == 'http://127.0.0.1:8080') {
        app.use(cors({
            origin: 'http://127.0.0.1:8080'
        }));
    }
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// just for localdev test
app.use(cors({ origin: ["http://localhost:3000", "http://127.0.0.1:8080"] }));
app.use('', ticket_1.default);
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
