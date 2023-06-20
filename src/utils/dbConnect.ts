import mongoose from 'mongoose';
import config from '../config';
import { logger } from '../logger';

const dbConnection = async () => {
  await mongoose.connect(config.database_url as string);
  logger.info('Successfully database connected.');
};

export default dbConnection;
