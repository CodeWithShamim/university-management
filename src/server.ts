import app from './app'
import config from './config'
import { errorLogger, logger } from './logger'
import dbConnection from './utils/dbConnect'

async function main() {
  await dbConnection()

  app.listen(config.port, () => {
    logger.info('Server listening to port', config.port)
  })
}

main().catch(err => errorLogger.error(err.message))
