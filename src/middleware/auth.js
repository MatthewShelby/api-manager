"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKey = getKey;
exports.getPassword = getPassword;
exports.getSecret = getSecret;
var jwt = require('jsonwebtoken');
// import { ICustomRequest} from '../models/request'
var dotenv = require('dotenv');
dotenv.config();
var auth = function (req, res, next) {
    var _a;
    console.log(('Authorization'));
    console.log(req.header('Authorization'));
    var token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET || '');
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
function getKey() {
    return process.env.JWT_SECRET;
}
function getPassword() {
    return process.env.Password;
}
function getSecret() {
    return process.env.SECRET;
}
exports.default = auth;
