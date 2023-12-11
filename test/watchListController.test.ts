import watchlistServices from '../src/services/watchlist.service'; // Update the path
import { WatchListConstant } from '../src/constants/watchlist.constant';
import { Request, Response } from 'express';
import { IReturnResponse } from '@interfaces/response';
import { addWatchlist, getWatchLists } from '@controllers/watchlist.controller';
import { IWatchlist } from '@models/watchlist.model';

jest.mock('../src/services/watchlist.service');

describe('Watchlist Controller', () => {
    const req: Request = { method: 'GET', url: '/api/v1/crypto/list' } as Request;

    afterEach(() => {
        jest.clearAllMocks();
    });


    const responseData = <IReturnResponse>{
        ok: true,
        status: WatchListConstant.listWatchList.status,
        message: WatchListConstant.listWatchList.msg,
        data: [
            {
                "_id": "60768941ca9a920829e9a4f7",
                "code": "BTC",
                "minPrice": 35000,
                "maxPrice": 60000,
            }
        ]
    } as unknown

    it('should add a cryptocurrency to the watchlist successfully', async () => {
        const requestPayload = <IWatchlist>{
            "code": 'BTC',
            "minPrice": 14,
            "maxPrice": 113
        };

        const mockWatchlistData = <IReturnResponse>{
            ok: true,
            status: 200,
            message: 'Added to watchlist successfully.',
            data: {}
        };

        (watchlistServices.add as jest.Mock).mockResolvedValue(mockWatchlistData);

        const responseBody = jest.fn()
        const res: Response = {
            status: jest.fn().mockImplementation(() => {
                return { json: responseBody }

            }),
        } as unknown as Response;
        const req = {
            body: requestPayload,
        } as Request;
        await addWatchlist(req, res, () => { });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(responseBody).toHaveBeenCalledWith(mockWatchlistData);
        expect(watchlistServices.add).toHaveBeenCalledWith({ body: requestPayload });

    });



    it('should fetch watchlists successfully', async () => {
        (watchlistServices.getWatchList as any).mockResolvedValue(responseData);
        const responseBody = jest.fn()
        const res: Response = {
            status: jest.fn().mockImplementation(() => {
                return { json: responseBody }

            }),
        } as unknown as Response;

        await getWatchLists(req, res, () => { });
        expect(responseBody).toHaveBeenCalledWith(responseData);
    });


});
