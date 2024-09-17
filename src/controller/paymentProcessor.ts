import PayRequest from "../models/PayRequest";
import { confirmTransfer } from "./offchain";
let onchain = require('./onchain')


export async function checkQueue() {
      let all = await PayRequest.find({ status: "newly" });
      if (all.length > 0) {
            try {
                  all.forEach(req => {
                        let id = req._id ? req._id.toString() : "NAN"
                        sendToProcessor(id)
                  });
            } catch (error) {
                  console.log(' In checkQueue() - Error in catch block:')
                  console.log(error)
            }
      }
}

export async function checkStatus() {
      let all = await PayRequest.find({ status: "processing" });
      if (all.length > 0) {
            try {
                  all.forEach(req => {
                        let id = req._id ? req._id.toString() : "NAN"
                        checkThis(id)
                  });
            } catch (error) {
                  console.log(' In checkStatus() - Error in catch block:')
                  console.log(error)
            }
      }
}


async function sendToProcessor(reqId: string) {
      let request = await PayRequest.findById(reqId);
      if (request) {
            request.status = "processing";
            await request.save()
            onchain.process(JSON.stringify(request));
            console.log('send to processor done.')
            setTimeout(async () => {
                  let id = request._id?.toString() || ""
                  checkThis(id)
            }, 15000);
      }
}


export async function checkThis(reqId: string) {
      try {
            let request = await PayRequest.findById(reqId);
            console.log('from check this - ticket is: ' + request?.ticketId)
            if (request) {
                  if (request.status == 'success' || request.status == 'failed') {
                        return
                  } else {
                        let check = await confirmTransfer(request.ticketId.toString());
                        console.log("check: ")
                        console.log(check)
                        request.status = check.status;
                        request.result = { event_id: check.result }
                        await request.save()
                  }
            }
      } catch (error) {
            console.log("check this error: ")
            console.log(error)
      }
}

