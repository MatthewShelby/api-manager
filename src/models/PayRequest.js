"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PayRequestSchema = new mongoose_1.Schema({
    ticketId: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    time: { type: Date, required: true },
    queue: { type: Number, required: true },
    status: { type: String, required: true, default: "newly" },
    result: { type: Object, required: true, default: {} }
});
exports.default = mongoose_1.default.model('PayRequest', PayRequestSchema);
