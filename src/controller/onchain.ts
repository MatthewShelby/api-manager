import { Address, internal, beginCell, contractAddress, toNano, Cell, TonClient4, WalletContractV4, fromNano } from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { buildOnchainMetadata } from "../utils/jetton-helpers";
import { SampleJetton } from "../utils/output/SampleJetton_SampleJetton";
import { storeTokenTransfer } from "../utils/output/SampleJetton_JettonDefaultWallet";
import { getSeed } from "../config/db";
let dotenv = require('dotenv');
dotenv.config();
const jetton_minter_root = Address.parse("EQCtrOa2fknbm6oXslRkT7JJhMczKaXo8JiJJxcGzX3sKpVs");

export async function process(inp: string) {
      let req = JSON.parse(inp);
      console.log(req)
      console.log("sendBonus()")
      console.log(req.amount, "paymentAPI", 0.1, req.address, req.ticketId)
      let processResult = await sendBonus(req.amount, req.ticketId.toString(), 0.1, req.address, req.ticketId)
      console.log(processResult)

}



async function sendBonus(bonusAmount: number, comment: String, deployTonAmount: number, receiverAddressString: string, ticketId: string) {
      try {
            const test_message = beginCell()
                  .storeBit(1)
                  .storeRef(beginCell().storeUint(0, 32).storeBuffer(Buffer.from(comment, "utf-8")).endCell())
                  .endCell();

            let deployAmount = toNano(deployTonAmount.toString());

            const client4 = new TonClient4({
                  endpoint: "https://sandbox-v4.tonhubapi.com",
                  // endpoint: "https://mainnet-v4.tonhubapi.com",
            });

            let loadedMnemonics = getSeed()
            console.log("loadedMnemonics: " + loadedMnemonics)
            let mnemonics = (loadedMnemonics || "").toString(); // 🔴 Change to your own, by creating .env file!
            let keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
            let secretKey = keyPair.secretKey;
            let workchain = 0; //we are working in basechain.


            let deployer_wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });

            let deployer_wallet_contract = client4.open(deployer_wallet);
            let thisBalance = await deployer_wallet_contract.getBalance();
            console.log('deployer_wallet_contract address: ' + deployer_wallet_contract.address);
            console.log('deployer_wallet_contract balance: ' + fromNano(thisBalance));
            if (deployAmount >= thisBalance) {
                  console.log('Insufficient Balance')
                  return { status: "error", message: 'Insufficient Balance' }
            }


            let wallet = WalletContractV4.create({
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
            let max_supply = toNano("1000000000000");
            let NewOnwer_Address = Address.parse(receiverAddressString); // 🔴 Owner should usually be the deploying wallet's address.

            let packed = beginCell()
                  .store(
                        storeTokenTransfer({
                              $$type: "TokenTransfer",
                              query_id: BigInt(0),
                              amount: toNano(bonusAmount),
                              to: NewOnwer_Address,
                              // to: new_owner_jetton_wallet.address,
                              // destination: new_owner_jetton_wallet.address,
                              response_destination: wallet_contract.address, // Original Owner, aka. First Minter's Jetton Wallet
                              custom_payload: null,
                              forward_ton_amount: toNano("0.00000001"),
                              forward_payload: test_message,
                        })
                  )
                  .endCell();




            // Create content Cell
            let content = buildOnchainMetadata(jettonParams);
            let init = await SampleJetton.init(wallet_contract.address, content, max_supply);
            let jetton_masterWallet = contractAddress(workchain, init);
            let contract_dataFormat = SampleJetton.fromAddress(jetton_masterWallet);
            let contract = client4.open(contract_dataFormat);
            let jetton_wallet = await contract.getGetWalletAddress(wallet_contract.address);
            let seqno: number = await wallet_contract.getSeqno();

            let sendResult = await wallet_contract.sendTransfer({
                  seqno,
                  secretKey,
                  messages: [
                        internal({
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
            console.log("Transfer transaction has been send.")
            return ({ status: "success", result: sendResult })

      } catch (error) {
            console.log('Error In Sending Transaction')
            console.log(error)
            return ({ status: "error", message: error })
      }
}

