"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let express = require('express');
const ticket_1 = __importDefault(require("../models/ticket"));
const auth_1 = __importStar(require("../middleware/auth"));
// import jwt from 'jsonwebtoken';
let jwt = require('jsonwebtoken');
const PayRequest_1 = __importDefault(require("../models/PayRequest"));
const keyVal_1 = __importDefault(require("../models/keyVal"));
const paymentProcessor_1 = require("../controller/paymentProcessor");
var CryptoJS = require("crypto-js");
const router = express.Router();
router.get('/login', (req, res) => {
    let password = req.query.password;
    if (!password || password == '') {
        return res.status(400).json({ status: 'error', msg: 'Empty password' });
    }
    if (password != (0, auth_1.getPassword)()) {
        return res.status(400).json({ status: 'error', msg: 'Invalid password' });
    }
    const payload = {
        agent: {
            id: '125a',
        },
    };
    jwt.sign(payload, (0, auth_1.getKey)() || '', // replace with a strong secret key
    { expiresIn: '30d' }, (err, token) => {
        if (err)
            throw err;
        res.json({ token });
    });
});
router.get('/key', async (req, res) => {
    try {
        let all = await keyVal_1.default.find();
        console.log(typeof (all));
        res.status(200).json({ status: 'success', data: all });
    }
    catch (error) {
        res.status(500).json({ status: 'error', msg: 'Server Error', error: error });
    }
});
router.get('/all', async (req, res) => {
    try {
        let all = await ticket_1.default.find();
        console.log(typeof (all));
        res.status(200).json({ status: 'success', data: all });
    }
    catch (error) {
        res.status(500).json({ status: 'error', msg: 'Server Error', error: error });
    }
});
router.get('/getTicketById', async (req, res) => {
    let id = req.query.ticketId;
    if (!id || id == '') {
        return res.status(400).json({ status: 'error', msg: 'Invalid ticketId' });
    }
    try {
        // console.log(await confirmTransfer(id.toString()))
        let tickets = await PayRequest_1.default.find({ ticketId: id.toString() });
        if (tickets.length > 0) {
            let ticket = tickets[0];
            let id = ticket._id ? ticket._id.toString() : "NAN";
            await (0, paymentProcessor_1.checkThis)(id.toString());
            console.log(typeof (ticket));
            console.log((ticket));
            res.status(200).json({ status: 'success', data: ticket });
        }
        else {
            res.status(404).json({ status: 'error', msg: 'Couldn\'t fint the ticket @getTicketById', errorInternalCode: "getTicketById-404" });
        }
    }
    catch (error) {
        res.status(500).json({ status: 'error', msg: 'Server Error', error: error });
    }
});
router.get('/allPay', async (req, res) => {
    try {
        let all = await PayRequest_1.default.find();
        console.log(typeof (all));
        res.status(200).json({ status: 'success', data: all });
    }
    catch (error) {
        res.status(500).json({ status: 'error', msg: 'Server Error', error: error });
    }
});
router.get('/chechQueue', (req, res) => {
    //"T1726502537896"
    (0, paymentProcessor_1.checkQueue)();
    res.status(200).json({ status: 'success', data: "checkQueue() has been caalled" });
});
router.get('/checkTr', async (req, res) => {
    let id = req.query.ticketId;
    if (!id || id == '') {
        return res.status(400).json({ msg: 'Invalid ticketId' });
    }
    try {
        console.log("before checkThis ticketId is: " + id);
        let ticket = new Array();
        ticket = await PayRequest_1.default.find({ ticketId: id.toString() });
        let tid = ticket[0]._id.toString();
        await (0, paymentProcessor_1.checkThis)(tid);
        console.log("ticket");
        console.log(typeof (ticket));
        console.log((ticket));
        res.status(200).json({ status: 'success', data: ticket });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', msg: 'Server Error', error: error });
    }
});
router.post('/sendticket', auth_1.default, async (req, res) => {
    // const { ticketId, address, amount } = req.body;
    const { encryptedTicket } = req.body;
    console.log("encryptedTicket:");
    console.log(encryptedTicket);
    let Sec = (0, auth_1.getSecret)();
    console.log(Sec);
    var decrypted = await CryptoJS.AES.decrypt(encryptedTicket, Sec);
    console.log("decrypted");
    console.log(decrypted);
    var decTicket = await decrypted.toString(CryptoJS.enc.Utf8);
    console.log("decTicket");
    console.log(decTicket);
    let decObj = JSON.parse(decTicket);
    let ticketId = decObj.ticketId;
    let address = decObj.address;
    let amount = decObj.amount;
    if (!ticketId || !address || !amount) {
        return res.status(400).json({ status: 'error', msg: 'Please provide all fields' });
    }
    try {
        let existing = await ticket_1.default.find({ ticketId: ticketId });
        if (existing.length > 0) {
            return res.status(400).json({ status: 'error', msg: 'Ticket Id Exists.' });
        }
        let time = new Date(Date.now());
        const newTicket = new ticket_1.default({ ticketId, address, amount, time });
        await newTicket.save();
        let queue = getQueue(await keyVal_1.default.find({ key: "latestQueue" }));
        const status = "newly";
        const emptyObj = {};
        const newPayRequest = new PayRequest_1.default({ ticketId, address, amount, time, queue, status, emptyObj });
        await newPayRequest.save();
        let LQ = await keyVal_1.default.find({ key: "latestQueue" });
        let myLQ = LQ[0];
        myLQ.value = { queue: queue + 1 };
        await myLQ.save();
        (0, paymentProcessor_1.checkQueue)();
        // res.status(201).json(newTicket);
        res.status(200).json({ status: 'success', data: newTicket });
    }
    catch (err) {
        res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
});
function getQueue(inp) {
    return JSON.parse(JSON.stringify(inp[0].value)).queue;
}
router.get('/test', async (req, res) => {
    console.log('test is called');
    try {
        res.status(201).json({ status: "success", msg: "test is ok" });
    }
    catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});
exports.default = router;
