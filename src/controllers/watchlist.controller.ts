import asyncWrapper from '@utils/asyncWrapper'
import { returnResponse } from '@utils/returnResponse'
import watchListServices from '@services/watchlist.service'

// Endpoint for adding watchlist
export const addWatchlist = asyncWrapper(async (req, res) => {
  const returns = await watchListServices.add(req)
  returnResponse(res, returns)
})

// Endpoint for fetching watchlists
export const getWatchLists = asyncWrapper(async (req, res) => {
    const returns = await watchListServices.getWatchList(req)
    returnResponse(res, returns)
  })
