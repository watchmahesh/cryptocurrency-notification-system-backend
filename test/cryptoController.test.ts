import { CryptoConstant } from '@constants/crypto.constant';
import { getcryptocurrencies } from '@controllers/crypto.controller';
import cryptoServices from '@services/crypto.service';
import { Request, Response } from 'express';
import { IReturnResponse } from '@interfaces/response'

// Mock the dependencies
jest.mock('@services/crypto.service');

describe('Crypto Controller', () => {
    const req: Request = { method: 'GET', url: '/api/v1/crypto/list' } as Request;

    // Clear mock implementation before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch cryptocurrencies successfully', async () => {
        const responseData = <IReturnResponse>{
            ok: true,
            status: CryptoConstant.listcrypto.status,
            message: CryptoConstant.listcrypto.msg,
            data: [
                {
                    "_id": "6576a7b9f068fc78a7a5193f",
                    "image": "https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg?size=30x30",
                    "code": "BTC",
                    "name": "Bitcoin",
                    "price": "42123.17",
                    "marketCap": "824.21",
                    "change24h": "-4.04"
                }
            ]
        } as unknown
        (cryptoServices.find as any).mockResolvedValue(responseData);
        const responseBody = jest.fn()
        const res: Response = {
            status: jest.fn().mockImplementation(() => {
                return { json: responseBody }

            }),
        } as unknown as Response;

        await getcryptocurrencies(req, res, () => { });
        expect(responseBody).toHaveBeenCalledWith(responseData);

    });
});
