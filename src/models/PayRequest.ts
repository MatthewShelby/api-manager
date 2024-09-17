import mongoose, { Schema, Document } from 'mongoose';

// export enum ReqStatus {
//       newly,
//       inPorcess,
//       failed,
//       succeed
// }

export interface IPayRequest extends Document {
      ticketId: string;
      address: string;
      amount: number;
      time: Date;
      queue: number;
      status: string;
      result: object;
}

const PayRequestSchema: Schema = new Schema({
      ticketId: { type: String, required: true, unique: true },
      address: { type: String, required: true },
      amount: { type: Number, required: true },
      time: { type: Date, required: true },
      queue: { type: Number, required: true },
      status: { type: String, required: true, default: "newly" },
      result: { type: Object, required: true, default: {} }
});

export default mongoose.model<IPayRequest>('PayRequest', PayRequestSchema);
