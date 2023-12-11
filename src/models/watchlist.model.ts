import { Document, Schema, model } from 'mongoose'

const watchlistSchema = new Schema(
  {
    code: { type: String },
    minPrice: { type: Number },
    maxPrice: { type: Number },

  },
  { timestamps: true }
)
export interface IWatchlist extends Document {
  code: string;
  minPrice: number;
  maxPrice: number;
}

const Watchlist = model<IWatchlist>('Watchlist', watchlistSchema)
export default Watchlist
