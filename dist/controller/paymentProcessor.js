"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkQueue = checkQueue;
exports.checkStatus = checkStatus;
exports.checkThis = checkThis;
const PayRequest_1 = __importDefault(require("../models/PayRequest"));
const offchain_1 = require("./offchain");
let onchain = require('./onchain');
async function checkQueue() {
    let all = await PayRequest_1.default.find({ status: "newly" });
    if (all.length > 0) {
        try {
            all.forEach(req => {
                let id = req._id ? req._id.toString() : "NAN";
                sendToProcessor(id);
            });
        }
        catch (error) {
            console.log(' In checkQueue() - Error in catch block:');
            console.log(error);
        }
    }
}
async function checkStatus() {
    let all = await PayRequest_1.default.find({ status: "processing" });
    if (all.length > 0) {
        try {
            all.forEach(req => {
                let id = req._id ? req._id.toString() : "NAN";
                checkThis(id);
            });
        }
        catch (error) {
            console.log(' In checkStatus() - Error in catch block:');
            console.log(error);
        }
    }
}
async function sendToProcessor(reqId) {
    let request = await PayRequest_1.default.findById(reqId);
    if (request) {
        request.status = "processing";
        await request.save();
        onchain.process(JSON.stringify(request));
        console.log('send to processor done.');
        setTimeout(async () => {
            var _a;
            let id = ((_a = request._id) === null || _a === void 0 ? void 0 : _a.toString()) || "";
            checkThis(id);
        }, 15000);
    }
}
async function checkThis(reqId) {
    try {
        let request = await PayRequest_1.default.findById(reqId);
        console.log('from check this - ticket is: ' + (request === null || request === void 0 ? void 0 : request.ticketId));
        if (request) {
            if (request.status == 'success' || request.status == 'failed') {
                return;
            }
            else {
                let check = await (0, offchain_1.confirmTransfer)(request.ticketId.toString());
                console.log("check: ");
                console.log(check);
                request.status = check.status;
                request.result = { event_id: check.result };
                await request.save();
            }
        }
    }
    catch (error) {
        console.log("check this error: ");
        console.log(error);
    }
}
