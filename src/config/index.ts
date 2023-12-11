import * as dotenv from 'dotenv'

dotenv.config()

const config = {
  app: {
    name: process.env.APP_NAME,
    env: process.env.NODE_ENV || 'development',
    url: process.env.APP_URL || 'http://localhost:8000',
    host: process.env.APP_HOST || 'localhost',
    port: process.env.APP_PORT || 8000,
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
    originRegex: process.env.ORIGIN_REGEX,
    allowedOrigins: process.env.ALLOWED_ORIGIN,
    morganLevel: process.env.MORGAN_LEVEL || 'dev'
  },


  db: {
    mongo_uri: process.env.MONGO_URI,
    strictDB: Boolean(process.env.MONGO_STRICT_DB) || false
  },

}
export default config
