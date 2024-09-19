"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.process = process;
const ton_1 = require("@ton/ton");
const crypto_1 = require("@ton/crypto");
const jetton_helpers_1 = require("../utils/jetton-helpers");
const SampleJetton_SampleJetton_1 = require("../utils/output/SampleJetton_SampleJetton");
const SampleJetton_JettonDefaultWallet_1 = require("../utils/output/SampleJetton_JettonDefaultWallet");
const db_1 = require("../config/db");
let dotenv = require('dotenv');
dotenv.config();
const jetton_minter_root = ton_1.Address.parse("EQCtrOa2fknbm6oXslRkT7JJhMczKaXo8JiJJxcGzX3sKpVs");
async function process(inp) {
    let req = JSON.parse(inp);
    console.log(req);
    console.log("sendBonus()");
    console.log(req.amount, "paymentAPI", 0.1, req.address, req.ticketId);
    let processResult = await sendBonus(req.amount, req.ticketId.toString(), 0.1, req.address, req.ticketId);
    console.log(processResult);
}
async function sendBonus(bonusAmount, comment, deployTonAmount, receiverAddressString, ticketId) {
    try {
        const test_message = (0, ton_1.beginCell)()
            .storeBit(1)
            .storeRef((0, ton_1.beginCell)().storeUint(0, 32).storeBuffer(Buffer.from(comment, "utf-8")).endCell())
            .endCell();
        let deployAmount = (0, ton_1.toNano)(deployTonAmount.toString());
        const client4 = new ton_1.TonClient4({
            endpoint: "https://sandbox-v4.tonhubapi.com",
            // endpoint: "https://mainnet-v4.tonhubapi.com",
        });
        let loadedMnemonics = (0, db_1.getSeed)();
        console.log("loadedMnemonics: " + loadedMnemonics);
        let mnemonics = (loadedMnemonics || "").toString(); // 🔴 Change to your own, by creating .env file!
        let keyPair = await (0, crypto_1.mnemonicToPrivateKey)(mnemonics.split(" "));
        let secretKey = keyPair.secretKey;
        let workchain = 0; //we are working in basechain.
        let deployer_wallet = ton_1.WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
        let deployer_wallet_contract = client4.open(deployer_wallet);
        let thisBalance = await deployer_wallet_contract.getBalance();
        console.log('deployer_wallet_contract address: ' + deployer_wallet_contract.address);
        console.log('deployer_wallet_contract balance: ' + (0, ton_1.fromNano)(thisBalance));
        if (deployAmount >= thisBalance) {
            console.log('Insufficient Balance');
            return { status: "error", message: 'Insufficient Balance' };
        }
        let wallet = ton_1.WalletContractV4.create({
            workchain,
            publicKey: keyPair.publicKey,
        });
        let wallet_contract = client4.open(wallet);
        const jettonParams = {
            name: "MoriAi Airdrop",
            description: "MoriAi Project Airdrop Token.",
            symbol: "MRAD",
            image: "https://developer-decuple.github.io/StaticFiles/MRAD.png",
        };
        let max_supply = (0, ton_1.toNano)("1000000000000");
        let NewOnwer_Address = ton_1.Address.parse(receiverAddressString); // 🔴 Owner should usually be the deploying wallet's address.
        let packed = (0, ton_1.beginCell)()
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
        // Create content Cell
        let content = (0, jetton_helpers_1.buildOnchainMetadata)(jettonParams);
        let init = await SampleJetton_SampleJetton_1.SampleJetton.init(wallet_contract.address, content, max_supply);
        let jetton_masterWallet = (0, ton_1.contractAddress)(workchain, init);
        let contract_dataFormat = SampleJetton_SampleJetton_1.SampleJetton.fromAddress(jetton_masterWallet);
        let contract = client4.open(contract_dataFormat);
        let jetton_wallet = await contract.getGetWalletAddress(wallet_contract.address);
        let seqno = await wallet_contract.getSeqno();
        let sendResult = await wallet_contract.sendTransfer({
            seqno,
            secretKey,
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
        });
        console.log("Transfer transaction has been send.");
        return ({ status: "success", result: sendResult });
    }
    catch (error) {
        console.log('Error In Sending Transaction');
        console.log(error);
        return ({ status: "error", message: error });
    }
}
