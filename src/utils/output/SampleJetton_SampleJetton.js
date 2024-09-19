"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.SampleJetton = void 0;
exports.storeStateInit = storeStateInit;
exports.loadStateInit = loadStateInit;
exports.storeContext = storeContext;
exports.loadContext = loadContext;
exports.storeSendParameters = storeSendParameters;
exports.loadSendParameters = loadSendParameters;
exports.storeChangeOwner = storeChangeOwner;
exports.loadChangeOwner = loadChangeOwner;
exports.storeChangeOwnerOk = storeChangeOwnerOk;
exports.loadChangeOwnerOk = loadChangeOwnerOk;
exports.storeJettonData = storeJettonData;
exports.loadJettonData = loadJettonData;
exports.storeJettonWalletData = storeJettonWalletData;
exports.loadJettonWalletData = loadJettonWalletData;
exports.storeTokenTransfer = storeTokenTransfer;
exports.loadTokenTransfer = loadTokenTransfer;
exports.storeTokenTransferInternal = storeTokenTransferInternal;
exports.loadTokenTransferInternal = loadTokenTransferInternal;
exports.storeTokenNotification = storeTokenNotification;
exports.loadTokenNotification = loadTokenNotification;
exports.storeTokenBurn = storeTokenBurn;
exports.loadTokenBurn = loadTokenBurn;
exports.storeTokenBurnNotification = storeTokenBurnNotification;
exports.loadTokenBurnNotification = loadTokenBurnNotification;
exports.storeTokenExcesses = storeTokenExcesses;
exports.loadTokenExcesses = loadTokenExcesses;
exports.storeTokenUpdateContent = storeTokenUpdateContent;
exports.loadTokenUpdateContent = loadTokenUpdateContent;
exports.storeProvideWalletAddress = storeProvideWalletAddress;
exports.loadProvideWalletAddress = loadProvideWalletAddress;
exports.storeTakeWalletAddress = storeTakeWalletAddress;
exports.loadTakeWalletAddress = loadTakeWalletAddress;
exports.storeMint = storeMint;
exports.loadMint = loadMint;
var core_1 = require("@ton/core");
function storeStateInit(src) {
    return function (builder) {
        var b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}
function loadStateInit(slice) {
    var sc_0 = slice;
    var _code = sc_0.loadRef();
    var _data = sc_0.loadRef();
    return { $$type: 'StateInit', code: _code, data: _data };
}
function loadTupleStateInit(source) {
    var _code = source.readCell();
    var _data = source.readCell();
    return { $$type: 'StateInit', code: _code, data: _data };
}
function storeTupleStateInit(source) {
    var builder = new core_1.TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}
function dictValueParserStateInit() {
    return {
        serialize: function (src, buidler) {
            buidler.storeRef((0, core_1.beginCell)().store(storeStateInit(src)).endCell());
        },
        parse: function (src) {
            return loadStateInit(src.loadRef().beginParse());
        }
    };
}
function storeContext(src) {
    return function (builder) {
        var b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}
function loadContext(slice) {
    var sc_0 = slice;
    var _bounced = sc_0.loadBit();
    var _sender = sc_0.loadAddress();
    var _value = sc_0.loadIntBig(257);
    var _raw = sc_0.loadRef();
    return { $$type: 'Context', bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}
function loadTupleContext(source) {
    var _bounced = source.readBoolean();
    var _sender = source.readAddress();
    var _value = source.readBigNumber();
    var _raw = source.readCell();
    return { $$type: 'Context', bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}
function storeTupleContext(source) {
    var builder = new core_1.TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}
function dictValueParserContext() {
    return {
        serialize: function (src, buidler) {
            buidler.storeRef((0, core_1.beginCell)().store(storeContext(src)).endCell());
        },
        parse: function (src) {
            return loadContext(src.loadRef().beginParse());
        }
    };
}
function storeSendParameters(src) {
    return function (builder) {
        var b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        }
        else {
            b_0.storeBit(false);
        }
        if (src.code !== null && src.code !== undefined) {
            b_0.storeBit(true).storeRef(src.code);
        }
        else {
            b_0.storeBit(false);
        }
        if (src.data !== null && src.data !== undefined) {
            b_0.storeBit(true).storeRef(src.data);
        }
        else {
            b_0.storeBit(false);
        }
    };
}
function loadSendParameters(slice) {
    var sc_0 = slice;
    var _bounce = sc_0.loadBit();
    var _to = sc_0.loadAddress();
    var _value = sc_0.loadIntBig(257);
    var _mode = sc_0.loadIntBig(257);
    var _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    var _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    var _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters', bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}
function loadTupleSendParameters(source) {
    var _bounce = source.readBoolean();
    var _to = source.readAddress();
    var _value = source.readBigNumber();
    var _mode = source.readBigNumber();
    var _body = source.readCellOpt();
    var _code = source.readCellOpt();
    var _data = source.readCellOpt();
    return { $$type: 'SendParameters', bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}
function storeTupleSendParameters(source) {
    var builder = new core_1.TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}
function dictValueParserSendParameters() {
    return {
        serialize: function (src, buidler) {
            buidler.storeRef((0, core_1.beginCell)().store(storeSendParameters(src)).endCell());
        },
        parse: function (src) {
            return loadSendParameters(src.loadRef().beginParse());
        }
    };
}
function storeChangeOwner(src) {
    return function (builder) {
        var b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}
function loadChangeOwner(slice) {
    var sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) {
        throw Error('Invalid prefix');
    }
    var _queryId = sc_0.loadUintBig(64);
    var _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner', queryId: _queryId, newOwner: _newOwner };
}
function loadTupleChangeOwner(source) {
    var _queryId = source.readBigNumber();
    var _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner', queryId: _queryId, newOwner: _newOwner };
}
function storeTupleChangeOwner(source) {
    var builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}
function dictValueParserChangeOwner() {
    return {
        serialize: function (src, buidler) {
            buidler.storeRef((0, core_1.beginCell)().store(storeChangeOwner(src)).endCell());
        },
        parse: function (src) {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    };
}
function storeChangeOwnerOk(src) {
    return function (builder) {
        var b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}
function loadChangeOwnerOk(slice) {
    var sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) {
        throw Error('Invalid prefix');
    }
    var _queryId = sc_0.loadUintBig(64);
    var _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk', queryId: _queryId, newOwner: _newOwner };
}
function loadTupleChangeOwnerOk(source) {
    var _queryId = source.readBigNumber();
    var _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk', queryId: _queryId, newOwner: _newOwner };
}
function storeTupleChangeOwnerOk(source) {
    var builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}
function dictValueParserChangeOwnerOk() {
    return {
        serialize: function (src, buidler) {
            buidler.storeRef((0, core_1.beginCell)().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: function (src) {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    };
}
function storeJettonData(src) {
    return function (builder) {
        var b_0 = builder;
        b_0.storeInt(src.total_supply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.wallet_code);
    };
}
function loadJettonData(slice) {
    var sc_0 = slice;
    var _total_supply = sc_0.loadIntBig(257);
    var _mintable = sc_0.loadBit();
    var _owner = sc_0.loadAddress();
    var _content = sc_0.loadRef();
    var _wallet_code = sc_0.loadRef();
    return { $$type: 'JettonData', total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}
function loadTupleJettonData(source) {
    var _total_supply = source.readBigNumber();
    var _mintable = source.readBoolean();
    var _owner = source.readAddress();
    var _content = source.readCell();
    var _wallet_code = source.readCell();
    return { $$type: 'JettonData', total_supply: _total_supply, mintable: _mintable, owner: _owner, content: _content, wallet_code: _wallet_code };
}
function storeTupleJettonData(source) {
    var builder = new core_1.TupleBuilder();
    builder.writeNumber(source.total_supply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.wallet_code);
    return builder.build();
}
function dictValueParserJettonData() {
    return {
        serialize: function (src, buidler) {
            buidler.storeRef((0, core_1.beginCell)().store(storeJettonData(src)).endCell());
        },
        parse: function (src) {
            return loadJettonData(src.loadRef().beginParse());
        }
    };
}
function storeJettonWalletData(src) {
    return function (builder) {
        var b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.code);
    };
}
function loadJettonWalletData(slice) {
    var sc_0 = slice;
    var _balance = sc_0.loadIntBig(257);
    var _owner = sc_0.loadAddress();
    var _master = sc_0.loadAddress();
    var _code = sc_0.loadRef();
    return { $$type: 'JettonWalletData', balance: _balance, owner: _owner, master: _master, code: _code };
}
function loadTupleJettonWalletData(source) {
    var _balance = source.readBigNumber();
    var _owner = source.readAddress();
    var _master = source.readAddress();
    var _code = source.readCell();
    return { $$type: 'JettonWalletData', balance: _balance, owner: _owner, master: _master, code: _code };
}
function storeTupleJettonWalletData(source) {
    var builder = new core_1.TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.code);
    return builder.build();
}
function dictValueParserJettonWalletData() {
    return {
        serialize: function (src, buidler) {
            buidler.storeRef((0, core_1.beginCell)().store(storeJettonWalletData(src)).endCell());
        },
        parse: function (src) {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    };
}
function storeTokenTransfer(src) {
    return function (builder) {
        var b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) {
            b_0.storeBit(true).storeRef(src.custom_payload);
        }
        else {
            b_0.storeBit(false);
        }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}
function loadTokenTransfer(slice) {
    var sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) {
        throw Error('Invalid prefix');
    }
    var _query_id = sc_0.loadUintBig(64);
    var _amount = sc_0.loadCoins();
    var _sender = sc_0.loadAddress();
    var _response_destination = sc_0.loadMaybeAddress();
    var _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    var _forward_ton_amount = sc_0.loadCoins();
    var _forward_payload = sc_0.asCell();
    return { $$type: 'TokenTransfer', query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
function loadTupleTokenTransfer(source) {
    var _query_id = source.readBigNumber();
    var _amount = source.readBigNumber();
    var _sender = source.readAddress();
    var _response_destination = source.readAddressOpt();
    var _custom_payload = source.readCellOpt();
    var _forward_ton_amount = source.readBigNumber();
    var _forward_payload = source.readCell();
    return { $$type: 'TokenTransfer', query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
function storeTupleTokenTransfer(source) {
    var builder = new core_1.TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}
function dictValueParserTokenTransfer() {
    return {
        serialize: function (src, buidler) {
            buidler.storeRef((0, core_1.beginCell)().store(storeTokenTransfer(src)).endCell());
        },
        parse: function (src) {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    };
}
function storeTokenTransferInternal(src) {
    return function (builder) {
        var b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}
function loadTokenTransferInternal(slice) {
    var sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) {
        throw Error('Invalid prefix');
    }
    var _query_id = sc_0.loadUintBig(64);
    var _amount = sc_0.loadCoins();
    var _from = sc_0.loadAddress();
    var _response_destination = sc_0.loadMaybeAddress();
    var _forward_ton_amount = sc_0.loadCoins();
    var _forward_payload = sc_0.asCell();
    return { $$type: 'TokenTransferInternal', query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
function loadTupleTokenTransferInternal(source) {
    var _query_id = source.readBigNumber();
    var _amount = source.readBigNumber();
    var _from = source.readAddress();
    var _response_destination = source.readAddressOpt();
    var _forward_ton_amount = source.readBigNumber();
    var _forward_payload = source.readCell();
    return { $$type: 'TokenTransferInternal', query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
function storeTupleTokenTransferInternal(source) {
    var builder = new core_1.TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}
function dictValueParserTokenTransferInternal() {
    return {
        serialize: function (src, buidler) {
            buidler.storeRef((0, core_1.beginCell)().store(storeTokenTransferInternal(src)).endCell());
        },
        parse: function (src) {
            return loadTokenTransferInternal(src.loadRef().beginParse());
        }
    };
}
function storeTokenNotification(src) {
    return function (builder) {
        var b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}
function loadTokenNotification(slice) {
    var sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) {
        throw Error('Invalid prefix');
    }
    var _query_id = sc_0.loadUintBig(64);
    var _amount = sc_0.loadCoins();
    var _from = sc_0.loadAddress();
    var _forward_payload = sc_0.asCell();
    return { $$type: 'TokenNotification', query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}
function loadTupleTokenNotification(source) {
    var _query_id = source.readBigNumber();
    var _amount = source.readBigNumber();
    var _from = source.readAddress();
    var _forward_payload = source.readCell();
    return { $$type: 'TokenNotification', query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}
function storeTupleTokenNotification(source) {
    var builder = new core_1.TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}
function dictValueParserTokenNotification() {
    return {
        serialize: function (src, buidler) {
            buidler.storeRef((0, core_1.beginCell)().store(storeTokenNotification(src)).endCell());
        },
        parse: function (src) {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    };
}
function storeTokenBurn(src) {
    return function (builder) {
        var b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) {
            b_0.storeBit(true).storeRef(src.custom_payload);
        }
        else {
            b_0.storeBit(false);
        }
    };
}
function loadTokenBurn(slice) {
    var sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) {
        throw Error('Invalid prefix');
    }
    var _query_id = sc_0.loadUintBig(64);
    var _amount = sc_0.loadCoins();
    var _response_destination = sc_0.loadMaybeAddress();
    var _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenBurn', query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}
function loadTupleTokenBurn(source) {
    var _query_id = source.readBigNumber();
    var _amount = source.readBigNumber();
    var _response_destination = source.readAddressOpt();
    var _custom_payload = source.readCellOpt();
    return { $$type: 'TokenBurn', query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}
function storeTupleTokenBurn(source) {
    var builder = new core_1.TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}
function dictValueParserTokenBurn() {
    return {
        serialize: function (src, buidler) {
            buidler.storeRef((0, core_1.beginCell)().store(storeTokenBurn(src)).endCell());
        },
        parse: function (src) {
            return loadTokenBurn(src.loadRef().beginParse());
        }
    };
}
function storeTokenBurnNotification(src) {
    return function (builder) {
        var b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
    };
}
function loadTokenBurnNotification(slice) {
    var sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) {
        throw Error('Invalid prefix');
    }
    var _query_id = sc_0.loadUintBig(64);
    var _amount = sc_0.loadCoins();
    var _sender = sc_0.loadAddress();
    var _response_destination = sc_0.loadMaybeAddress();
    return { $$type: 'TokenBurnNotification', query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}
function loadTupleTokenBurnNotification(source) {
    var _query_id = source.readBigNumber();
    var _amount = source.readBigNumber();
    var _sender = source.readAddress();
    var _response_destination = source.readAddressOpt();
    return { $$type: 'TokenBurnNotification', query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}
function storeTupleTokenBurnNotification(source) {
    var builder = new core_1.TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    return builder.build();
}
function dictValueParserTokenBurnNotification() {
    return {
        serialize: function (src, buidler) {
            buidler.storeRef((0, core_1.beginCell)().store(storeTokenBurnNotification(src)).endCell());
        },
        parse: function (src) {
            return loadTokenBurnNotification(src.loadRef().beginParse());
        }
    };
}
function storeTokenExcesses(src) {
    return function (builder) {
        var b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}
function loadTokenExcesses(slice) {
    var sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) {
        throw Error('Invalid prefix');
    }
    var _query_id = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses', query_id: _query_id };
}
function loadTupleTokenExcesses(source) {
    var _query_id = source.readBigNumber();
    return { $$type: 'TokenExcesses', query_id: _query_id };
}
function storeTupleTokenExcesses(source) {
    var builder = new core_1.TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}
function dictValueParserTokenExcesses() {
    return {
        serialize: function (src, buidler) {
            buidler.storeRef((0, core_1.beginCell)().store(storeTokenExcesses(src)).endCell());
        },
        parse: function (src) {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    };
}
function storeTokenUpdateContent(src) {
    return function (builder) {
        var b_0 = builder;
        b_0.storeUint(2937889386, 32);
        b_0.storeRef(src.content);
    };
}
function loadTokenUpdateContent(slice) {
    var sc_0 = slice;
    if (sc_0.loadUint(32) !== 2937889386) {
        throw Error('Invalid prefix');
    }
    var _content = sc_0.loadRef();
    return { $$type: 'TokenUpdateContent', content: _content };
}
function loadTupleTokenUpdateContent(source) {
    var _content = source.readCell();
    return { $$type: 'TokenUpdateContent', content: _content };
}
function storeTupleTokenUpdateContent(source) {
    var builder = new core_1.TupleBuilder();
    builder.writeCell(source.content);
    return builder.build();
}
function dictValueParserTokenUpdateContent() {
    return {
        serialize: function (src, buidler) {
            buidler.storeRef((0, core_1.beginCell)().store(storeTokenUpdateContent(src)).endCell());
        },
        parse: function (src) {
            return loadTokenUpdateContent(src.loadRef().beginParse());
        }
    };
}
function storeProvideWalletAddress(src) {
    return function (builder) {
        var b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.owner_address);
        b_0.storeBit(src.include_address);
    };
}
function loadProvideWalletAddress(slice) {
    var sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) {
        throw Error('Invalid prefix');
    }
    var _query_id = sc_0.loadUintBig(64);
    var _owner_address = sc_0.loadAddress();
    var _include_address = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress', query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}
function loadTupleProvideWalletAddress(source) {
    var _query_id = source.readBigNumber();
    var _owner_address = source.readAddress();
    var _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress', query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}
function storeTupleProvideWalletAddress(source) {
    var builder = new core_1.TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.owner_address);
    builder.writeBoolean(source.include_address);
    return builder.build();
}
function dictValueParserProvideWalletAddress() {
    return {
        serialize: function (src, buidler) {
            buidler.storeRef((0, core_1.beginCell)().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: function (src) {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    };
}
function storeTakeWalletAddress(src) {
    return function (builder) {
        var b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.wallet_address);
        b_0.storeBuilder(src.owner_address.asBuilder());
    };
}
function loadTakeWalletAddress(slice) {
    var sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) {
        throw Error('Invalid prefix');
    }
    var _query_id = sc_0.loadUintBig(64);
    var _wallet_address = sc_0.loadAddress();
    var _owner_address = sc_0.asCell();
    return { $$type: 'TakeWalletAddress', query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}
function loadTupleTakeWalletAddress(source) {
    var _query_id = source.readBigNumber();
    var _wallet_address = source.readAddress();
    var _owner_address = source.readCell();
    return { $$type: 'TakeWalletAddress', query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}
function storeTupleTakeWalletAddress(source) {
    var builder = new core_1.TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.wallet_address);
    builder.writeSlice(source.owner_address);
    return builder.build();
}
function dictValueParserTakeWalletAddress() {
    return {
        serialize: function (src, buidler) {
            buidler.storeRef((0, core_1.beginCell)().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: function (src) {
            return loadTakeWalletAddress(src.loadRef().beginParse());
        }
    };
}
function storeMint(src) {
    return function (builder) {
        var b_0 = builder;
        b_0.storeUint(4235234258, 32);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.receiver);
    };
}
function loadMint(slice) {
    var sc_0 = slice;
    if (sc_0.loadUint(32) !== 4235234258) {
        throw Error('Invalid prefix');
    }
    var _amount = sc_0.loadIntBig(257);
    var _receiver = sc_0.loadAddress();
    return { $$type: 'Mint', amount: _amount, receiver: _receiver };
}
function loadTupleMint(source) {
    var _amount = source.readBigNumber();
    var _receiver = source.readAddress();
    return { $$type: 'Mint', amount: _amount, receiver: _receiver };
}
function storeTupleMint(source) {
    var builder = new core_1.TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.receiver);
    return builder.build();
}
function dictValueParserMint() {
    return {
        serialize: function (src, buidler) {
            buidler.storeRef((0, core_1.beginCell)().store(storeMint(src)).endCell());
        },
        parse: function (src) {
            return loadMint(src.loadRef().beginParse());
        }
    };
}
function initSampleJetton_init_args(src) {
    return function (builder) {
        var b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeInt(src.max_supply, 257);
    };
}
function SampleJetton_init(owner, content, max_supply) {
    return __awaiter(this, void 0, void 0, function () {
        var __code, __system, builder, __data;
        return __generator(this, function (_a) {
            __code = core_1.Cell.fromBase64('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');
            __system = core_1.Cell.fromBase64('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');
            builder = (0, core_1.beginCell)();
            builder.storeRef(__system);
            builder.storeUint(0, 1);
            initSampleJetton_init_args({ $$type: 'SampleJetton_init_args', owner: owner, content: content, max_supply: max_supply })(builder);
            __data = builder.endCell();
            return [2 /*return*/, { code: __code, data: __data }];
        });
    });
}
var SampleJetton_errors = {
    2: { message: "Stack undeflow" },
    3: { message: "Stack overflow" },
    4: { message: "Integer overflow" },
    5: { message: "Integer out of expected range" },
    6: { message: "Invalid opcode" },
    7: { message: "Type check error" },
    8: { message: "Cell overflow" },
    9: { message: "Cell underflow" },
    10: { message: "Dictionary error" },
    13: { message: "Out of gas error" },
    32: { message: "Method ID not found" },
    34: { message: "Action is invalid or not supported" },
    37: { message: "Not enough TON" },
    38: { message: "Not enough extra-currencies" },
    128: { message: "Null reference exception" },
    129: { message: "Invalid serialization prefix" },
    130: { message: "Invalid incoming message" },
    131: { message: "Constraints error" },
    132: { message: "Access denied" },
    133: { message: "Contract stopped" },
    134: { message: "Invalid argument" },
    135: { message: "Code of a contract was not found" },
    136: { message: "Invalid address" },
    137: { message: "Masterchain support is not enabled for this contract" },
    3688: { message: "Not mintable" },
    4429: { message: "Invalid sender" },
    12241: { message: "Max supply exceeded" },
    14534: { message: "Not owner" },
    16059: { message: "Invalid value" },
    18668: { message: "Can't Mint Anymore" },
    23951: { message: "Insufficient gas" },
    42708: { message: "Invalid sender!" },
    43422: { message: "Invalid value - Burn" },
    62972: { message: "Invalid balance" },
};
var SampleJetton_types = [
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounced", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }] },
    { "name": "ChangeOwner", "header": 2174598809, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "newOwner", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "ChangeOwnerOk", "header": 846932810, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "newOwner", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "JettonData", "header": null, "fields": [{ "name": "total_supply", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "mintable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "owner", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "content", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "wallet_code", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "JettonWalletData", "header": null, "fields": [{ "name": "balance", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "owner", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "master", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "TokenTransfer", "header": 260734629, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "response_destination", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "custom_payload", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "forward_ton_amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "TokenTransferInternal", "header": 395134233, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "from", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "response_destination", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "forward_ton_amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "TokenNotification", "header": 1935855772, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "from", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "TokenBurn", "header": 1499400124, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "response_destination", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "custom_payload", "type": { "kind": "simple", "type": "cell", "optional": true } }] },
    { "name": "TokenBurnNotification", "header": 2078119902, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "response_destination", "type": { "kind": "simple", "type": "address", "optional": true } }] },
    { "name": "TokenExcesses", "header": 3576854235, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "TokenUpdateContent", "header": 2937889386, "fields": [{ "name": "content", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "ProvideWalletAddress", "header": 745978227, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "owner_address", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "include_address", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "TakeWalletAddress", "header": 3513996288, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "wallet_address", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "owner_address", "type": { "kind": "simple", "type": "slice", "optional": false, "format": "remainder" } }] },
    { "name": "Mint", "header": 4235234258, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "receiver", "type": { "kind": "simple", "type": "address", "optional": false } }] },
];
var SampleJetton_getters = [
    { "name": "get_jetton_data", "arguments": [], "returnType": { "kind": "simple", "type": "JettonData", "optional": false } },
    { "name": "get_wallet_address", "arguments": [{ "name": "owner", "type": { "kind": "simple", "type": "address", "optional": false } }], "returnType": { "kind": "simple", "type": "address", "optional": false } },
    { "name": "owner", "arguments": [], "returnType": { "kind": "simple", "type": "address", "optional": false } },
];
var SampleJetton_receivers = [
    { "receiver": "internal", "message": { "kind": "typed", "type": "Mint" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "Mint: 100" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "Owner: MintClose" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "TokenUpdateContent" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "TokenBurnNotification" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "ProvideWalletAddress" } },
];
var SampleJetton = /** @class */ (function () {
    function SampleJetton(address, init) {
        this.abi = {
            types: SampleJetton_types,
            getters: SampleJetton_getters,
            receivers: SampleJetton_receivers,
            errors: SampleJetton_errors,
        };
        this.address = address;
        this.init = init;
    }
    SampleJetton.init = function (owner, content, max_supply) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, SampleJetton_init(owner, content, max_supply)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SampleJetton.fromInit = function (owner, content, max_supply) {
        return __awaiter(this, void 0, void 0, function () {
            var init, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, SampleJetton_init(owner, content, max_supply)];
                    case 1:
                        init = _a.sent();
                        address = (0, core_1.contractAddress)(0, init);
                        return [2 /*return*/, new SampleJetton(address, init)];
                }
            });
        });
    };
    SampleJetton.fromAddress = function (address) {
        return new SampleJetton(address);
    };
    SampleJetton.prototype.send = function (provider, via, args, message) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = null;
                        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Mint') {
                            body = (0, core_1.beginCell)().store(storeMint(message)).endCell();
                        }
                        if (message === 'Mint: 100') {
                            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
                        }
                        if (message === 'Owner: MintClose') {
                            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
                        }
                        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'TokenUpdateContent') {
                            body = (0, core_1.beginCell)().store(storeTokenUpdateContent(message)).endCell();
                        }
                        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'TokenBurnNotification') {
                            body = (0, core_1.beginCell)().store(storeTokenBurnNotification(message)).endCell();
                        }
                        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'ProvideWalletAddress') {
                            body = (0, core_1.beginCell)().store(storeProvideWalletAddress(message)).endCell();
                        }
                        if (body === null) {
                            throw new Error('Invalid message type');
                        }
                        return [4 /*yield*/, provider.internal(via, __assign(__assign({}, args), { body: body }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SampleJetton.prototype.getGetJettonData = function (provider) {
        return __awaiter(this, void 0, void 0, function () {
            var builder, source, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        builder = new core_1.TupleBuilder();
                        return [4 /*yield*/, provider.get('get_jetton_data', builder.build())];
                    case 1:
                        source = (_a.sent()).stack;
                        result = loadTupleJettonData(source);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SampleJetton.prototype.getGetWalletAddress = function (provider, owner) {
        return __awaiter(this, void 0, void 0, function () {
            var builder, source, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        builder = new core_1.TupleBuilder();
                        builder.writeAddress(owner);
                        return [4 /*yield*/, provider.get('get_wallet_address', builder.build())];
                    case 1:
                        source = (_a.sent()).stack;
                        result = source.readAddress();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SampleJetton.prototype.getOwner = function (provider) {
        return __awaiter(this, void 0, void 0, function () {
            var builder, source, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        builder = new core_1.TupleBuilder();
                        return [4 /*yield*/, provider.get('owner', builder.build())];
                    case 1:
                        source = (_a.sent()).stack;
                        result = source.readAddress();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return SampleJetton;
}());
exports.SampleJetton = SampleJetton;
