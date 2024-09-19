"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var ticket_1 = require("../models/ticket");
var auth_1 = require("../middleware/auth");
// import jwt from 'jsonwebtoken';
var jwt = require('jsonwebtoken');
var PayRequest_1 = require("../models/PayRequest");
var keyVal_1 = require("../models/keyVal");
var paymentProcessor_1 = require("../controller/paymentProcessor");
var CryptoJS = require("crypto-js");
var router = express.Router();
router.get('/login', function (req, res) {
    var password = req.query.password;
    if (!password || password == '') {
        return res.status(400).json({ status: 'error', msg: 'Empty password' });
    }
    if (password != (0, auth_1.getPassword)()) {
        return res.status(400).json({ status: 'error', msg: 'Invalid password' });
    }
    var payload = {
        agent: {
            id: '125a',
        },
    };
    jwt.sign(payload, (0, auth_1.getKey)() || '', // replace with a strong secret key
    { expiresIn: '30d' }, function (err, token) {
        if (err)
            throw err;
        res.json({ token: token });
    });
});
router.get('/key', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var all, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, keyVal_1.default.find()];
            case 1:
                all = _a.sent();
                console.log(typeof (all));
                res.status(200).json({ status: 'success', data: all });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ status: 'error', msg: 'Server Error', error: error_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/all', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var all, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, ticket_1.default.find()];
            case 1:
                all = _a.sent();
                console.log(typeof (all));
                res.status(200).json({ status: 'success', data: all });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ status: 'error', msg: 'Server Error', error: error_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/getTicketById', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, tickets, ticket, id_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.query.ticketId;
                if (!id || id == '') {
                    return [2 /*return*/, res.status(400).json({ status: 'error', msg: 'Invalid ticketId' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, PayRequest_1.default.find({ ticketId: id.toString() })];
            case 2:
                tickets = _a.sent();
                if (!(tickets.length > 0)) return [3 /*break*/, 4];
                ticket = tickets[0];
                id_1 = ticket._id ? ticket._id.toString() : "NAN";
                return [4 /*yield*/, (0, paymentProcessor_1.checkThis)(id_1.toString())];
            case 3:
                _a.sent();
                console.log(typeof (ticket));
                console.log((ticket));
                res.status(200).json({ status: 'success', data: ticket });
                return [3 /*break*/, 5];
            case 4:
                res.status(404).json({ status: 'error', msg: 'Couldn\'t fint the ticket @getTicketById', errorInternalCode: "getTicketById-404" });
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                res.status(500).json({ status: 'error', msg: 'Server Error', error: error_3 });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
router.get('/allPay', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var all, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, PayRequest_1.default.find()];
            case 1:
                all = _a.sent();
                console.log(typeof (all));
                res.status(200).json({ status: 'success', data: all });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500).json({ status: 'error', msg: 'Server Error', error: error_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get('/chechQueue', function (req, res) {
    //"T1726502537896"
    (0, paymentProcessor_1.checkQueue)();
    res.status(200).json({ status: 'success', data: "checkQueue() has been caalled" });
});
router.get('/checkTr', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, ticket, tid, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.query.ticketId;
                if (!id || id == '') {
                    return [2 /*return*/, res.status(400).json({ msg: 'Invalid ticketId' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                console.log("before checkThis ticketId is: " + id);
                ticket = new Array();
                return [4 /*yield*/, PayRequest_1.default.find({ ticketId: id.toString() })];
            case 2:
                ticket = _a.sent();
                tid = ticket[0]._id.toString();
                return [4 /*yield*/, (0, paymentProcessor_1.checkThis)(tid)];
            case 3:
                _a.sent();
                console.log("ticket");
                console.log(typeof (ticket));
                console.log((ticket));
                res.status(200).json({ status: 'success', data: ticket });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                console.log(error_5);
                res.status(500).json({ status: 'error', msg: 'Server Error', error: error_5 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/sendticket', auth_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var encryptedTicket, Sec, decrypted, decTicket, decObj, ticketId, address, amount, existing, time, newTicket, queue, _a, status_1, emptyObj, newPayRequest, LQ, myLQ, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                encryptedTicket = req.body.encryptedTicket;
                console.log("encryptedTicket:");
                console.log(encryptedTicket);
                Sec = (0, auth_1.getSecret)();
                console.log(Sec);
                return [4 /*yield*/, CryptoJS.AES.decrypt(encryptedTicket, Sec)];
            case 1:
                decrypted = _b.sent();
                console.log("decrypted");
                console.log(decrypted);
                return [4 /*yield*/, decrypted.toString(CryptoJS.enc.Utf8)];
            case 2:
                decTicket = _b.sent();
                console.log("decTicket");
                console.log(decTicket);
                decObj = JSON.parse(decTicket);
                ticketId = decObj.ticketId;
                address = decObj.address;
                amount = decObj.amount;
                if (!ticketId || !address || !amount) {
                    return [2 /*return*/, res.status(400).json({ status: 'error', msg: 'Please provide all fields' })];
                }
                _b.label = 3;
            case 3:
                _b.trys.push([3, 10, , 11]);
                return [4 /*yield*/, ticket_1.default.find({ ticketId: ticketId })];
            case 4:
                existing = _b.sent();
                if (existing.length > 0) {
                    return [2 /*return*/, res.status(400).json({ status: 'error', msg: 'Ticket Id Exists.' })];
                }
                time = new Date(Date.now());
                newTicket = new ticket_1.default({ ticketId: ticketId, address: address, amount: amount, time: time });
                return [4 /*yield*/, newTicket.save()];
            case 5:
                _b.sent();
                _a = getQueue;
                return [4 /*yield*/, keyVal_1.default.find({ key: "latestQueue" })];
            case 6:
                queue = _a.apply(void 0, [_b.sent()]);
                status_1 = "newly";
                emptyObj = {};
                newPayRequest = new PayRequest_1.default({ ticketId: ticketId, address: address, amount: amount, time: time, queue: queue, status: status_1, emptyObj: emptyObj });
                return [4 /*yield*/, newPayRequest.save()];
            case 7:
                _b.sent();
                return [4 /*yield*/, keyVal_1.default.find({ key: "latestQueue" })];
            case 8:
                LQ = _b.sent();
                myLQ = LQ[0];
                myLQ.value = { queue: queue + 1 };
                return [4 /*yield*/, myLQ.save()];
            case 9:
                _b.sent();
                (0, paymentProcessor_1.checkQueue)();
                // res.status(201).json(newTicket);
                res.status(200).json({ status: 'success', data: newTicket });
                return [3 /*break*/, 11];
            case 10:
                err_1 = _b.sent();
                res.status(500).json({ status: 'error', msg: 'Server Error' });
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); });
function getQueue(inp) {
    return JSON.parse(JSON.stringify(inp[0].value)).queue;
}
router.get('/test', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('test is called');
        try {
            res.status(201).json({ status: "success", msg: "test is ok" });
        }
        catch (err) {
            res.status(500).json({ msg: 'Server Error' });
        }
        return [2 /*return*/];
    });
}); });
exports.default = router;
