import { CryptoConstant } from '@constants/crypto.constant';
import { IReturnResponse } from '@interfaces/response'
import Crypto, { Icrypto } from '@models/crypto.model';
import axios from 'axios';
const cheerio = require('cheerio');


const scrapServices = {


    scrapAndSave: async (): Promise<IReturnResponse> => {
        try {
          const response = await axios.get('https://coinranking.com/');
          const html = response.data;
          const $ = cheerio.load(html);
          const cryptocurrencyElements = $('.table__row');
          const cryptocurrencies = cryptocurrencyElements.map((index: number, element: cheerio.Element) => {
            const image = $(element).find('.profile__logo').attr('src');
            const name = $(element).find('.profile__name a').text().trim();
            const code = $(element).find('.profile__subtitle-name').text().trim();
            const price = $(element).find('.valuta--light').eq(0).text().trim();
            const marketCap = $(element).find('.valuta--light').eq(1).text().trim();
            const change24h = $(element).find('.change--light').text().trim();

            return {
              image,
              code,
              name,
              price,
              marketCap,
              change24h,
            } as Icrypto;
          }).get();

          await Crypto.deleteMany(); // Clear existing data
          const cleanedDataArray = scrapServices.cleanData(cryptocurrencies);
          await Crypto.insertMany(cleanedDataArray);

          return {
            ok: true,
            status: CryptoConstant.addCrypto.status,
            message: CryptoConstant.addCrypto.msg,
            data: cleanedDataArray,
          };
        } catch (error) {
          return {
            ok: false,
            status: CryptoConstant.error.status,
            message: CryptoConstant.error.msg,
            data: {},
          };
        }
      },

    cleanData: (dataArray: Icrypto[]): Icrypto[] => {
        return dataArray
            .filter(data => (
                data.image && data.code && data.name && data.price && data.marketCap && data.change24h
            ))
            .map(data => {
                data.price = parseFloat(String(data.price).replace(/[^0-9.]/g, ''));
                data.marketCap = parseFloat(String(data.marketCap).replace(/[^0-9.]/g, ''));
                data.change24h = parseFloat(String(data.change24h).replace(/[^0-9.+-]/g, ''));
                return data;
            });
    }

}
export default scrapServices
