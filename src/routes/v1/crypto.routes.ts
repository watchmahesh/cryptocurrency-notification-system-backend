import { Router } from 'express'
import { getcryptocurrencies } from '@controllers/crypto.controller'

const cryptoRouter = Router()
cryptoRouter.get('/list', getcryptocurrencies)

export default cryptoRouter
