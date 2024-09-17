import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
// import { ICustomRequest} from '../models/request'

import dotenv from 'dotenv';

dotenv.config();

const auth = (req: Request, res: Response, next: NextFunction) => {
      console.log( ('Authorization'))
      console.log(req.header('Authorization'))
      const token = req.header('Authorization')?.split(' ')[1];

      if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
      }
      try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
            req.user = decoded;
            next();
      } catch (err) {
            res.status(401).json({ msg: 'Token is not valid' });
      }
};
export function getKey() {
      return process.env.JWT_SECRET
}
export function getPassword() {
      return process.env.Password
}
export function getSecret() {
      return process.env.SECRET
}
export default auth;

