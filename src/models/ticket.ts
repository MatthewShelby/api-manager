import mongoose, { Schema, Document } from 'mongoose';

interface ITicket extends Document {
      ticketId: string;
      address: string;
      amount: number;
      time: Date;
}

const TicketSchema: Schema = new Schema({
      ticketId: { type: String, required: true, unique: true },
      address: { type: String, required: true },
      amount: { type: Number, required: true },
      time: { type: Date, required: true },
});

export default mongoose.model<ITicket>('Ticket', TicketSchema);
