import { Router } from 'express'
import watchlistRouter from './watchlist.routes'
import cryptoRouter from './crypto.routes'
const router = Router()
router.use('/crypto', cryptoRouter)
router.use('/watchlist', watchlistRouter)
export default router
