import { CryptoConstant } from '@constants/crypto.constant';
import { Request } from 'express';
import { IReturnResponse } from '@interfaces/response'
import Crypto from '@models/crypto.model';


const cryptoService = {

    find: async (req: Request): Promise<IReturnResponse> => {
        try {
            const filter = await cryptoService.filterQuery(req);
            const datas = await Crypto.find(filter).select('-createdAt -updatedAt -__v').exec();
            return {
                ok: true,
                status: CryptoConstant.listcrypto.status,
                message: CryptoConstant.listcrypto.msg,
                data: datas,
            }
        } catch (error) {
            return {
                ok: false,
                status: CryptoConstant.error.status,
                message: CryptoConstant.error.msg,
                data: {}
            }
        }
    },

    filterQuery: async (req: any) => {
        const { keyword } = req.query;
        let filter: any = {};
        if (keyword) {
            filter.code = keyword;
        }
        return filter;
    }
}
export default cryptoService
