"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOnchainMetadata = buildOnchainMetadata;
exports.makeSnakeCell = makeSnakeCell;
const sha256_js_1 = require("@aws-crypto/sha256-js");
const core_1 = require("@ton/core");
const ONCHAIN_CONTENT_PREFIX = 0x00;
const SNAKE_PREFIX = 0x00;
const CELL_MAX_SIZE_BYTES = Math.floor((1023 - 8) / 8);
const sha256 = (str) => {
    const sha = new sha256_js_1.Sha256();
    sha.update(str);
    return Buffer.from(sha.digestSync());
};
const toKey = (key) => {
    return BigInt(`0x${sha256(key).toString("hex")}`);
};
function buildOnchainMetadata(data) {
    let dict = core_1.Dictionary.empty(core_1.Dictionary.Keys.BigUint(256), core_1.Dictionary.Values.Cell());
    // Store the on-chain metadata in the dictionary
    Object.entries(data).forEach(([key, value]) => {
        dict.set(toKey(key), makeSnakeCell(Buffer.from(value, "utf8")));
    });
    return (0, core_1.beginCell)().storeInt(ONCHAIN_CONTENT_PREFIX, 8).storeDict(dict).endCell();
}
function makeSnakeCell(data) {
    // Create a cell that package the data
    let chunks = bufferToChunks(data, CELL_MAX_SIZE_BYTES);
    const b = chunks.reduceRight((curCell, chunk, index) => {
        if (index === 0) {
            curCell.storeInt(SNAKE_PREFIX, 8);
        }
        curCell.storeBuffer(chunk);
        if (index > 0) {
            const cell = curCell.endCell();
            return (0, core_1.beginCell)().storeRef(cell);
        }
        else {
            return curCell;
        }
    }, (0, core_1.beginCell)());
    return b.endCell();
}
function bufferToChunks(buff, chunkSize) {
    let chunks = [];
    while (buff.byteLength > 0) {
        chunks.push(buff.slice(0, chunkSize));
        buff = buff.slice(chunkSize);
    }
    return chunks;
}
