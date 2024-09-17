import mongoose, { Schema, Document } from 'mongoose';

interface IKeyVal extends Document {
      key: string;
      value: object;
}

const KeyValSchema: Schema = new Schema({
      key: { type: String, required: true, unique: true },
      value: { type: Object, required: true },
});

export default mongoose.model<IKeyVal>('KeyVal', KeyValSchema);
