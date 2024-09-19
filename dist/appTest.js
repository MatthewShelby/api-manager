"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(function (req, res, next) {
    console.log("origin:");
    console.log(req.headers.origin);
    const origin = req.headers.origin;
    if (req.headers.origin == 'https://melarix.com') {
        app.use(cors({
            origin: 'https://melarix.com'
        }));
    }
    if (req.headers.origin == 'http://127.0.0.1:8080') {
        app.use(cors({
            origin: 'http://127.0.0.1:8080'
        }));
    }
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// just for localdev test
app.use(cors({ origin: ["http://localhost:3000", "http://127.0.0.1:8080"] }));
const router = express.Router();
router.get('/test', async (req, res) => {
    console.log('test is called');
    try {
        res.status(201).json({ status: "success", msg: "test is ok on the ts " });
    }
    catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});
app.use('', router);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
