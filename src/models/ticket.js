"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TicketSchema = new mongoose_1.Schema({
    ticketId: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    time: { type: Date, required: true },
});
exports.default = mongoose_1.default.model('Ticket', TicketSchema);
