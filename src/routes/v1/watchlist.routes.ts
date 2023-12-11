import { Router } from 'express'
import { addWatchlist, getWatchLists } from '@controllers/watchlist.controller'

const watchlistRouter = Router()
watchlistRouter.post('/add', addWatchlist)
watchlistRouter.get('/list', getWatchLists)

export default watchlistRouter
