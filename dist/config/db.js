"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeed = getSeed;
const mongoose_1 = __importDefault(require("mongoose"));
let jwt = require('jsonwebtoken');
let dotenv = require('dotenv');
dotenv.config();
const connectDB = async () => {
    try {
        console.log('from db.ts connection string is: ' + process.env.MONGO_URI);
        await mongoose_1.default.connect(process.env.MONGO_URI || '', {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
function getSeed() {
    return process.env.seed;
}
exports.default = connectDB;
