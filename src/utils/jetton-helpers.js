"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOnchainMetadata = buildOnchainMetadata;
exports.makeSnakeCell = makeSnakeCell;
var sha256_js_1 = require("@aws-crypto/sha256-js");
var core_1 = require("@ton/core");
var ONCHAIN_CONTENT_PREFIX = 0x00;
var SNAKE_PREFIX = 0x00;
var CELL_MAX_SIZE_BYTES = Math.floor((1023 - 8) / 8);
var sha256 = function (str) {
    var sha = new sha256_js_1.Sha256();
    sha.update(str);
    return Buffer.from(sha.digestSync());
};
var toKey = function (key) {
    return BigInt("0x".concat(sha256(key).toString("hex")));
};
function buildOnchainMetadata(data) {
    var dict = core_1.Dictionary.empty(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.Cell());
    // Store the on-chain metadata in the dictionary
    Object.entries(data).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        dict.set(toKey(key), makeSnakeCell(Buffer.from(value, "utf8")));
    });
    return (0, core_1.beginCell)().storeInt(ONCHAIN_CONTENT_PREFIX, 8).storeDict(dict).endCell();
}
function makeSnakeCell(data) {
    // Create a cell that package the data
    var chunks = bufferToChunks(data, CELL_MAX_SIZE_BYTES);
    var b = chunks.reduceRight(function (curCell, chunk, index) {
        if (index === 0) {
            curCell.storeInt(SNAKE_PREFIX, 8);
        }
        curCell.storeBuffer(chunk);
        if (index > 0) {
            var cell = curCell.endCell();
            return (0, core_1.beginCell)().storeRef(cell);
        }
        else {
            return curCell;
        }
    }, (0, core_1.beginCell)());
    return b.endCell();
}
function bufferToChunks(buff, chunkSize) {
    var chunks = [];
    while (buff.byteLength > 0) {
        chunks.push(buff.slice(0, chunkSize));
        buff = buff.slice(chunkSize);
    }
    return chunks;
}
