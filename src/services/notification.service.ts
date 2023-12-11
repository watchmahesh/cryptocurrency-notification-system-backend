import { CryptoConstant } from '@constants/crypto.constant';
import { IReturnResponse } from '@interfaces/response';
import Watchlist from '@models/watchlist.model';
import Crypto from '@models/crypto.model';

class NotificationService {

    async checkAndSendNotifications(): Promise<IReturnResponse> {
        try {
            // Fetch watchlist items
            const watchlist = await Watchlist.find();
            // Fetch the latest cryptocurrency data
            const cryptocurrencies = await Crypto.find();
            let notificationMessage;
            // Check for price changes and send notifications
            watchlist.forEach(async (watchlistItem) => {
                const cryptoData = cryptocurrencies.find((crypto) => crypto.code === watchlistItem.code);
                if (cryptoData) {
                    const { price, change24h } = cryptoData;
                    const { minPrice, maxPrice } = watchlistItem;
                    if (price < minPrice || price > maxPrice) {
                        // Implement notification logic (e.g., write to a log file)
                        console.log(`${cryptoData.name} is on the move. The Price is ${change24h}% in 24 hrs to $${price}`);
                        notificationMessage = `${cryptoData.name} is on the move! The price is ${price < minPrice ? 'down' : 'up'
                            } to $${price}`;

                    } else {
                        // For Testing Purpose only
                        notificationMessage = 'this is testing for notification';

                    }
                }
            });

            return {
                ok: true,
                status: 200,
                message: 'Notification sent successfully',
                data: notificationMessage,
            };
        } catch (error) {
            return {
                ok: false,
                status: CryptoConstant.error.status,
                message: CryptoConstant.error.msg,
                data: {},
            };
        }
    }
}

export default NotificationService;
