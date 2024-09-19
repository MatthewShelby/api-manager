"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var KeyValSchema = new mongoose_1.Schema({
    key: { type: String, required: true, unique: true },
    value: { type: Object, required: true },
});
exports.default = mongoose_1.default.model('KeyVal', KeyValSchema);
