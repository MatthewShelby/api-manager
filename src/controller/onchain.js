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
exports.process = process;
var ton_1 = require("@ton/ton");
var crypto_1 = require("@ton/crypto");
var jetton_helpers_1 = require("../utils/jetton-helpers");
var SampleJetton_SampleJetton_1 = require("../utils/output/SampleJetton_SampleJetton");
var SampleJetton_JettonDefaultWallet_1 = require("../utils/output/SampleJetton_JettonDefaultWallet");
var db_1 = require("../config/db");
var dotenv = require('dotenv');
dotenv.config();
var jetton_minter_root = ton_1.Address.parse("EQCtrOa2fknbm6oXslRkT7JJhMczKaXo8JiJJxcGzX3sKpVs");
function process(inp) {
    return __awaiter(this, void 0, void 0, function () {
        var req, processResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    req = JSON.parse(inp);
                    console.log(req);
                    console.log("sendBonus()");
                    console.log(req.amount, "paymentAPI", 0.1, req.address, req.ticketId);
                    return [4 /*yield*/, sendBonus(req.amount, req.ticketId.toString(), 0.1, req.address, req.ticketId)];
                case 1:
                    processResult = _a.sent();
                    console.log(processResult);
                    return [2 /*return*/];
            }
        });
    });
}
function sendBonus(bonusAmount, comment, deployTonAmount, receiverAddressString, ticketId) {
    return __awaiter(this, void 0, void 0, function () {
        var test_message, deployAmount, client4, loadedMnemonics, mnemonics, keyPair, secretKey, workchain, deployer_wallet, deployer_wallet_contract, thisBalance, wallet, wallet_contract, jettonParams, max_supply, NewOnwer_Address, packed, content, init, jetton_masterWallet, contract_dataFormat, contract, jetton_wallet, seqno, sendResult, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    test_message = (0, ton_1.beginCell)()
                        .storeBit(1)
                        .storeRef((0, ton_1.beginCell)().storeUint(0, 32).storeBuffer(Buffer.from(comment, "utf-8")).endCell())
                        .endCell();
                    deployAmount = (0, ton_1.toNano)(deployTonAmount.toString());
                    client4 = new ton_1.TonClient4({
                        endpoint: "https://sandbox-v4.tonhubapi.com",
                        // endpoint: "https://mainnet-v4.tonhubapi.com",
                    });
                    loadedMnemonics = (0, db_1.getSeed)();
                    console.log("loadedMnemonics: " + loadedMnemonics);
                    mnemonics = (loadedMnemonics || "").toString();
                    return [4 /*yield*/, (0, crypto_1.mnemonicToPrivateKey)(mnemonics.split(" "))];
                case 1:
                    keyPair = _a.sent();
                    secretKey = keyPair.secretKey;
                    workchain = 0;
                    deployer_wallet = ton_1.WalletContractV4.create({ workchain: workchain, publicKey: keyPair.publicKey });
                    deployer_wallet_contract = client4.open(deployer_wallet);
                    return [4 /*yield*/, deployer_wallet_contract.getBalance()];
                case 2:
                    thisBalance = _a.sent();
                    console.log('deployer_wallet_contract address: ' + deployer_wallet_contract.address);
                    console.log('deployer_wallet_contract balance: ' + (0, ton_1.fromNano)(thisBalance));
                    if (deployAmount >= thisBalance) {
                        console.log('Insufficient Balance');
                        return [2 /*return*/, { status: "error", message: 'Insufficient Balance' }];
                    }
                    wallet = ton_1.WalletContractV4.create({
                        workchain: workchain,
                        publicKey: keyPair.publicKey,
                    });
                    wallet_contract = client4.open(wallet);
                    jettonParams = {
                        name: "MoriAi Airdrop",
                        description: "MoriAi Project Airdrop Token.",
                        symbol: "MRAD",
                        image: "https://developer-decuple.github.io/StaticFiles/MRAD.png",
                    };
                    max_supply = (0, ton_1.toNano)("1000000000000");
                    NewOnwer_Address = ton_1.Address.parse(receiverAddressString);
                    packed = (0, ton_1.beginCell)()
                        .store((0, SampleJetton_JettonDefaultWallet_1.storeTokenTransfer)({
                        $$type: "TokenTransfer",
                        query_id: BigInt(0),
                        amount: (0, ton_1.toNano)(bonusAmount),
                        to: NewOnwer_Address,
                        // to: new_owner_jetton_wallet.address,
                        // destination: new_owner_jetton_wallet.address,
                        response_destination: wallet_contract.address, // Original Owner, aka. First Minter's Jetton Wallet
                        custom_payload: null,
                        forward_ton_amount: (0, ton_1.toNano)("0.00000001"),
                        forward_payload: test_message,
                    }))
                        .endCell();
                    content = (0, jetton_helpers_1.buildOnchainMetadata)(jettonParams);
                    return [4 /*yield*/, SampleJetton_SampleJetton_1.SampleJetton.init(wallet_contract.address, content, max_supply)];
                case 3:
                    init = _a.sent();
                    jetton_masterWallet = (0, ton_1.contractAddress)(workchain, init);
                    contract_dataFormat = SampleJetton_SampleJetton_1.SampleJetton.fromAddress(jetton_masterWallet);
                    contract = client4.open(contract_dataFormat);
                    return [4 /*yield*/, contract.getGetWalletAddress(wallet_contract.address)];
                case 4:
                    jetton_wallet = _a.sent();
                    return [4 /*yield*/, wallet_contract.getSeqno()];
                case 5:
                    seqno = _a.sent();
                    return [4 /*yield*/, wallet_contract.sendTransfer({
                            seqno: seqno,
                            secretKey: secretKey,
                            messages: [
                                (0, ton_1.internal)({
                                    to: jetton_wallet,
                                    value: deployAmount,
                                    init: {
                                        code: init.code,
                                        data: init.data,
                                    },
                                    bounce: true,
                                    body: packed,
                                }),
                            ],
                        })];
                case 6:
                    sendResult = _a.sent();
                    console.log("Transfer transaction has been send.");
                    return [2 /*return*/, ({ status: "success", result: sendResult })];
                case 7:
                    error_1 = _a.sent();
                    console.log('Error In Sending Transaction');
                    console.log(error_1);
                    return [2 /*return*/, ({ status: "error", message: error_1 })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
