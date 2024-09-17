import express, { Response, Request } from 'express';
import Ticket from '../models/ticket';
import auth, { getKey, getPassword, getSecret } from '../middleware/auth';
import jwt from 'jsonwebtoken';
import PayRequest from '../models/PayRequest';
import keyVal from '../models/keyVal';
import { checkQueue, checkThis } from '../controller/paymentProcessor';
import { confirmTransfer } from '../controller/offchain';

var CryptoJS = require("crypto-js");
const router = express.Router();

router.get('/login', (req, res) => {

      let password = req.query.password;
      if (!password || password == '') {
            return res.status(400).json({ status: 'error', msg: 'Empty password' });
      }
      if (password != getPassword()) {
            return res.status(400).json({ status: 'error', msg: 'Invalid password' });
      }

      const payload = {
            agent: {
                  id: '125a',
            },
      };

      jwt.sign(
            payload,
            getKey() || '', // replace with a strong secret key
            { expiresIn: '30d' },
            (err, token) => {
                  if (err) throw err;
                  res.json({ token });
            }
      );
})
router.get('/key', async (req, res) => {
      try {
            let all = await keyVal.find();
            console.log(typeof (all))
            res.status(200).json({ status: 'success', data: all });

      } catch (error) {
            res.status(500).json({ status: 'error', msg: 'Server Error', error: error });
      }
})
router.get('/all', async (req, res) => {
      try {
            let all = await Ticket.find();
            console.log(typeof (all))
            res.status(200).json({ status: 'success', data: all });

      } catch (error) {
            res.status(500).json({ status: 'error', msg: 'Server Error', error: error });
      }
})

router.get('/getTicketById', async (req, res) => {
      let id = req.query.ticketId;
      if (!id || id == '') {
            return res.status(400).json({ status: 'error', msg: 'Invalid ticketId' });
      }
      try {

            // console.log(await confirmTransfer(id.toString()))
            let tickets = await PayRequest.find({ ticketId: id.toString() });
            if (tickets.length > 0) {
                  let ticket = tickets[0]
                  let id = ticket._id ? ticket._id.toString() : "NAN"
                  await checkThis(id.toString())
                  console.log(typeof (ticket))
                  console.log((ticket))
                  res.status(200).json({ status: 'success', data: ticket });
            } else {
                  res.status(404).json({ status: 'error', msg: 'Couldn\'t fint the ticket @getTicketById', errorInternalCode: "getTicketById-404" });
            }

      } catch (error) {
            res.status(500).json({ status: 'error', msg: 'Server Error', error: error });
      }
})
router.get('/allPay', async (req, res) => {
      try {
            let all = await PayRequest.find();
            console.log(typeof (all))
            res.status(200).json({ status: 'success', data: all });

      } catch (error) {
            res.status(500).json({ status: 'error', msg: 'Server Error', error: error });
      }
})
router.get('/chechQueue', (req, res) => {
      //"T1726502537896"
      checkQueue()
      res.status(200).json({ status: 'success', data: "checkQueue() has been caalled" });

})
router.get('/checkTr', async (req, res) => {

      let id = req.query.ticketId;
      if (!id || id == '') {
            return res.status(400).json({ msg: 'Invalid ticketId' });
      }
      try {
            console.log("before checkThis ticketId is: " + id)

            let ticket = new Array();
            ticket = await PayRequest.find({ ticketId: id.toString() });
            let tid: string = ticket[0]._id.toString()
            await checkThis(tid)

            console.log("ticket")
            console.log(typeof (ticket))
            console.log((ticket))
            res.status(200).json({ status: 'success', data: ticket });

      } catch (error) {
            console.log(error)
            res.status(500).json({ status: 'error', msg: 'Server Error', error: error });
      }

})

router.post('/sendticket', auth, async (req: Request, res: Response) => {
      // const { ticketId, address, amount } = req.body;
      const { encryptedTicket } = req.body;
      console.log("encryptedTicket:")
      console.log(encryptedTicket) 
      
      let Sec = getSecret()
      console.log(Sec)
      
      var decrypted = await CryptoJS.AES.decrypt(encryptedTicket, Sec );
      console.log("decrypted")
      console.log(decrypted)

      var decTicket = await decrypted.toString(CryptoJS.enc.Utf8)
      console.log("decTicket")
      console.log(decTicket)
      let decObj = JSON.parse(decTicket);
      let ticketId = decObj.ticketId
      let address = decObj.address
      let amount = decObj.amount

      if (!ticketId || !address || !amount) {
            return res.status(400).json({ status: 'error', msg: 'Please provide all fields' });
      }

      try {
            let existing = await Ticket.find({ ticketId: ticketId })
            if (existing.length > 0) {
                  return res.status(400).json({ status: 'error', msg: 'Ticket Id Exists.' });
            }


            let time = new Date(Date.now())
            const newTicket = new Ticket({ ticketId, address, amount, time });
            await newTicket.save();

            let queue = getQueue(await keyVal.find({ key: "latestQueue" }))
            const status = "newly";
            const emptyObj = {}

            const newPayRequest = new PayRequest({ ticketId, address, amount, time, queue, status, emptyObj });
            await newPayRequest.save();
            let LQ = await keyVal.find({ key: "latestQueue" })
            let myLQ = LQ[0];
            myLQ.value = { queue: queue + 1 }
            await myLQ.save()
            checkQueue()
            // res.status(201).json(newTicket);
            res.status(200).json({ status: 'success', data: newTicket });

      } catch (err) {
            res.status(500).json({ status: 'error', msg: 'Server Error' });
      }
});


function getQueue(inp: any) {
      return JSON.parse(JSON.stringify(inp[0].value)).queue
}
router.get('/test', async (req: Request, res: Response) => {
      console.log('test is called')
      try {

            res.status(201).json({ status: "success", msg: "test is ok" });
      } catch (err) {
            res.status(500).json({ msg: 'Server Error' });
      }
});

export default router;
