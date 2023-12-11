import asyncWrapper from '@utils/asyncWrapper'
import { returnResponse } from '@utils/returnResponse'
import cryptoServices from '@services/crypto.service'



// Endpoint for fetching cryptocurrencies
export const getcryptocurrencies = asyncWrapper(async (req, res) => {
    const returns = await cryptoServices.find(req)
    returnResponse(res, returns)
  })
