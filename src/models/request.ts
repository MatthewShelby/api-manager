import { Request } from "express"
export interface ICustomRequest extends Request {
      user: any // or any other type
}