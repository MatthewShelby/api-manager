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
exports.confirmTransfer = confirmTransfer;
var keyVal_1 = require("../models/keyVal");
var senderId = "0%3Aa0177548f737ad8db73df80b85b3b1471ad8efd35b484f26a81ffc7d396cd5ff";
var jettonId = "0%3Aadace6b67e49db9baa17b254644fb24984c73329a5e8f09889271706cd7dec2a";
var apiURL = 'https://testnet.tonapi.io/v2/';
// const httpProvider = new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', { apiKey: 'f88f407b7a3dcc988b073c7ce3301c9840a272562ec400f7d636281b8f7f6ef5' })
// const tonweb = new TonWeb(httpProvider);
function fetchHistory() {
    return __awaiter(this, void 0, void 0, function () {
        var startDate, urlString;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startDate = (Math.floor((Date.now()) / 1000)) - (3 * 24 * 60 * 60);
                    urlString = apiURL + 'accounts/' + senderId + '/jettons/' + jettonId + '/history?limit=100&start_date=' + startDate;
                    return [4 /*yield*/, fetcher(urlString)
                        // try {
                        //       let startDate = (Math.floor((Date.now()) / 1000)) - (3 * 24 * 60 * 60)
                        //       let urlString = apiURL + 'accounts/' + senderId + '/jettons/' + jettonId + '/history?limit=100&start_date=' + startDate
                        //       console.log(urlString)
                        //       let history: object = {}
                        //       let fr = await fetcher(urlString)
                        //       console.log(fr)
                        // } catch (error) {
                        //       console.log(error)
                        //       return { status: 'error', data: error }
                        // }
                    ];
                case 1: return [2 /*return*/, _a.sent()
                    // try {
                    //       let startDate = (Math.floor((Date.now()) / 1000)) - (3 * 24 * 60 * 60)
                    //       let urlString = apiURL + 'accounts/' + senderId + '/jettons/' + jettonId + '/history?limit=100&start_date=' + startDate
                    //       console.log(urlString)
                    //       let history: object = {}
                    //       let fr = await fetcher(urlString)
                    //       console.log(fr)
                    // } catch (error) {
                    //       console.log(error)
                    //       return { status: 'error', data: error }
                    // }
                ];
            }
        });
    });
}
function fetcher(urlString) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(urlString).then(function (response) { return response.text(); })
                        .then(function (body) { return __awaiter(_this, void 0, void 0, function () {
                        var history, latestHistory, latestHistorys;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    history = JSON.parse(body);
                                    history.time = new Date(Date.now());
                                    latestHistory = undefined;
                                    return [4 /*yield*/, keyVal_1.default.find({ key: "LatestHistoryFetch" })];
                                case 1:
                                    latestHistorys = _a.sent();
                                    if (latestHistorys.length == 0) {
                                        latestHistory = new keyVal_1.default({ key: "LatestHistoryFetch", value: history });
                                    }
                                    else {
                                        latestHistory = latestHistorys[0];
                                        latestHistory.value = history;
                                    }
                                    latestHistory.save();
                                    return [2 /*return*/, { status: 'success', data: history }];
                            }
                        });
                    }); }).catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                        var time, latestHistoryError, HistoryErrors;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    time = new Date(Date.now());
                                    latestHistoryError = undefined;
                                    return [4 /*yield*/, keyVal_1.default.find({ key: "LatestHistoryError" })];
                                case 1:
                                    HistoryErrors = _a.sent();
                                    if (HistoryErrors.length == 0) {
                                        latestHistoryError = new keyVal_1.default({ key: "LatestHistoryError", value: { time: time, error: error } });
                                    }
                                    else {
                                        latestHistoryError = HistoryErrors[0];
                                        latestHistoryError.value = { time: time, error: error };
                                    }
                                    latestHistoryError.save();
                                    return [2 /*return*/, { status: 'error', data: error }];
                            }
                        });
                    }); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function confirmTransfer(ticketId) {
    return __awaiter(this, void 0, void 0, function () {
        var res, fetchData, data_1, events, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res = { status: 'unknown', result: 'unknown' };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchHistory()];
                case 2:
                    fetchData = _a.sent();
                    data_1 = "NAN";
                    if ((fetchData === null || fetchData === void 0 ? void 0 : fetchData.status) == 'error') {
                        return [2 /*return*/, { status: 'error', result: "Error in \'confirmTransfer\'. Unable to fetch History data.", data: fetchData.data || "no data" }];
                    }
                    else {
                        events = new Array();
                        events = JSON.parse(JSON.stringify(fetchData === null || fetchData === void 0 ? void 0 : fetchData.data)).events;
                        console.log('Events length: ' + events.length);
                        events.forEach(function (ev) {
                            if (ticketId == ev.actions[0].JettonTransfer.comment) {
                                console.log(ev.actions[0].JettonTransfer.recipients_wallet);
                                data_1 = ev.actions[0].JettonTransfer.recipients_wallet;
                                if (data_1 == "0:0000000000000000000000000000000000000000000000000000000000000000") {
                                    res.status = "failed";
                                    res.result = "Transaction has been failed.";
                                }
                                else {
                                    res.status = "success";
                                    res.result = ev.event_id;
                                }
                            }
                        });
                        return [2 /*return*/, res];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, { status: 'error', result: "Error in \'confirmTransfer\'. catch block. ", data: error_1 }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
