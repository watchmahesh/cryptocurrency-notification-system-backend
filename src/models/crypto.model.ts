import { Document, Schema, model } from 'mongoose'

const cryptoSchema = new Schema(
  {
    image: { type: String },
    code: { type: String },
    name: { type: String },
    price: { type: String },
    marketCap: { type: String },
    change24h: { type: String },
  },
  { timestamps: true }
)
export interface Icrypto extends Document {
    image: string;
    code: string;
    name: string;
    price: number;
    marketCap: number;
    change24h: number;
}

const Crypto = model<Icrypto>('Crypto', cryptoSchema)
export default Crypto
