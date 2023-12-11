import { WatchListConstant } from '@constants/watchlist.constant';
import { Request } from 'express';
import { IReturnResponse } from '@interfaces/response'
import Watchlist from '@models/watchlist.model';


const watchlistService = {


    add: async (req: Request): Promise<IReturnResponse> => {
        try {
            const { code, minPrice, maxPrice } = req.body;
            const existingWatchlistItem = await Watchlist.findOne({ code });
            if (existingWatchlistItem) {
                return {
                    ok: false,
                    status: WatchListConstant.AlreadyInWatchLIst.status,
                    message: 'Cryptocurrency already in watchlist',
                    data: {}
                }
            }
            const newWatchlistItem = new Watchlist({ code, minPrice, maxPrice });
            await newWatchlistItem.save();
            return {
                ok: true,
                status: WatchListConstant.addWatchList.status,
                message: WatchListConstant.addWatchList.msg,
                data: newWatchlistItem
            }
        } catch (error) {
            console.error(error);
            return {
                ok: true,
                status: WatchListConstant.error.status,
                message: WatchListConstant.error.msg,
                data: {}
            }
        }
    },

    getWatchList: async (req: Request): Promise<IReturnResponse> => {
        try {
            const filter = await watchlistService.filterQuery(req);
            const watchlists = await Watchlist.find(filter).select('-createdAt -updatedAt -__v').sort({ name: 1 });
            return {
                ok: true,
                status: WatchListConstant.listWatchList.status,
                message: WatchListConstant.listWatchList.msg,
                data: watchlists,
            }
        } catch (error) {
            return {
                ok: true,
                status: WatchListConstant.error.status,
                message: WatchListConstant.error.msg,
                data: {}
            }
        }
    },

    filterQuery: async (req: any) => {
        const { minPostcode, maxPostcode } = req.query;
        let filter: any = {};
        if (minPostcode && maxPostcode) {
            filter.postcode = { $gte: minPostcode, $lte: maxPostcode };
        }
        return filter;
    }
}
export default watchlistService
