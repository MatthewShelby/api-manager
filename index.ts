console.log("---00")
// import { getHistory } from "./src/controller/onchain"
import { Address } from "@ton/ton";
// import TonWeb from "tonweb";
const TonWeb = require('tonweb');
const fs = require('fs')
// const tonweb = new TonWeb();
const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', { apiKey: 'f88f407b7a3dcc988b073c7ce3301c9840a272562ec400f7d636281b8f7f6ef5' }));
//f88f407b7a3dcc988b073c7ce3301c9840a272562ec400f7d636281b8f7f6ef5
let userAddress = "0QDvIlV7vw3BfoT_f3YBVgmBNuRy3Id9Rv55rBGwRCRRIZUW"
console.log()
async function main() {
      // let userJettonWalletAddress = await getHistory(userAddress)
      // const historyA = await tonweb.getTransactions(Address.parse("kQCWe8G227Qz8Y6KYVzIih94ACrMtsmu7uwIoIyGq-T4b5xy"));
      const historyA = await tonweb.getTransactions(Address.parse("0QCgF3VI9zetjbc9-AuFs7FHGtjv01tITyaoH_x9OWzV_6KD"),20);
      //const historyB = await tonweb.getTransactions(userJettonWalletAddress);
      console.log(historyA.length)
      //console.log(historyB)
      fs.writeFileSync('./hisb.json',JSON.stringify(historyA,null,2))
}
main()