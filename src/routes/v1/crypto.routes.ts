import { Router } from 'express'
import { getcryptocurrencies, manualScrap } from '@controllers/crypto.controller'

const cryptoRouter = Router()
cryptoRouter.get('/list', getcryptocurrencies)
cryptoRouter.get('/manual-scrap', manualScrap)

export default cryptoRouter
