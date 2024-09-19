"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmTransfer = confirmTransfer;
const keyVal_1 = __importDefault(require("../models/keyVal"));
const senderId = "0%3Aa0177548f737ad8db73df80b85b3b1471ad8efd35b484f26a81ffc7d396cd5ff";
const jettonId = "0%3Aadace6b67e49db9baa17b254644fb24984c73329a5e8f09889271706cd7dec2a";
const apiURL = 'https://testnet.tonapi.io/v2/';
// const httpProvider = new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', { apiKey: 'f88f407b7a3dcc988b073c7ce3301c9840a272562ec400f7d636281b8f7f6ef5' })
// const tonweb = new TonWeb(httpProvider);
async function fetchHistory() {
    // const history = await tonweb.getTransactions("EQCgF3VI9zetjbc9-AuFs7FHGtjv01tITyaoH_x9OWzV_0TM");
    // const history = await tonweb.getTransactions("EQCgF3VI9zetjbc9-AuFs7FHGtjv01tITyaoH_x9OWzV_0TM",10);
    // const history = await tonweb.getTransactions("EQALX2Ok5Efna09MD3I9tzLgKaVCwA8a2q0dY1nMb9AQS22U",10);
    let startDate = (Math.floor((Date.now()) / 1000)) - (3 * 24 * 60 * 60);
    let urlString = apiURL + 'accounts/' + senderId + '/jettons/' + jettonId + '/history?limit=100&start_date=' + startDate;
    return await fetcher(urlString);
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
}
async function fetcher(urlString) {
    return await fetch(urlString).then((response) => response.text())
        .then(async (body) => {
        let history = JSON.parse(body);
        history.time = new Date(Date.now());
        // fs.writeFileSync('./ress.json', JSON.stringify(history, null, 2))
        let latestHistory = undefined;
        let latestHistorys = await keyVal_1.default.find({ key: "LatestHistoryFetch" });
        if (latestHistorys.length == 0) {
            latestHistory = new keyVal_1.default({ key: "LatestHistoryFetch", value: history });
        }
        else {
            latestHistory = latestHistorys[0];
            latestHistory.value = history;
        }
        latestHistory.save();
        return { status: 'success', data: history };
    }).catch(async (error) => {
        let time = new Date(Date.now());
        let latestHistoryError = undefined;
        var HistoryErrors = await keyVal_1.default.find({ key: "LatestHistoryError" });
        if (HistoryErrors.length == 0) {
            latestHistoryError = new keyVal_1.default({ key: "LatestHistoryError", value: { time: time, error: error } });
        }
        else {
            latestHistoryError = HistoryErrors[0];
            latestHistoryError.value = { time: time, error: error };
        }
        latestHistoryError.save();
        return { status: 'error', data: error };
    });
}
async function confirmTransfer(ticketId) {
    let res = { status: 'unknown', result: 'unknown' };
    try {
        let fetchData = await fetchHistory();
        let data = "NAN";
        if ((fetchData === null || fetchData === void 0 ? void 0 : fetchData.status) == 'error') {
            return { status: 'error', result: "Error in \'confirmTransfer\'. Unable to fetch History data.", data: fetchData.data || "no data" };
        }
        else {
            let events = new Array();
            events = JSON.parse(JSON.stringify(fetchData === null || fetchData === void 0 ? void 0 : fetchData.data)).events;
            console.log('Events length: ' + events.length);
            events.forEach(ev => {
                if (ticketId == ev.actions[0].JettonTransfer.comment) {
                    console.log(ev.actions[0].JettonTransfer.recipients_wallet);
                    data = ev.actions[0].JettonTransfer.recipients_wallet;
                    if (data == "0:0000000000000000000000000000000000000000000000000000000000000000") {
                        res.status = "failed";
                        res.result = "Transaction has been failed.";
                    }
                    else {
                        res.status = "success";
                        res.result = ev.event_id;
                    }
                }
            });
            return res;
        }
    }
    catch (error) {
        return { status: 'error', result: "Error in \'confirmTransfer\'. catch block. ", data: error };
    }
}
