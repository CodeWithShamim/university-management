import app from './app'
import config from './config'
import dbConnection from './utils/dbConnect'

async function main() {
  await dbConnection()

  app.listen(config.port, () => {
    console.log('Server listening to port', config.port)
  })
}

main().catch(err => console.log(err))
