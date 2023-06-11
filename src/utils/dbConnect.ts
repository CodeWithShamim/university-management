import mongoose from 'mongoose'
import config from '../config'

const dbConnection = async () => {
  await mongoose.connect(config.database_url as string)
  console.log('Successfully database connected.')
}

export default dbConnection
