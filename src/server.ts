import { Server } from 'http';
import app from './app';
import config from './config';
// import { errorLogger, logger } from './logger';
import dbConnection from './utils/dbConnect';
let server: Server;

// uncaughtException
process.on('uncaughtException', error => {
  console.log('Uncaught Exception is detected. we are closing our server!');
  console.log({ error });
  process.exit(1);
});

async function main() {
  await dbConnection();

  server = app.listen(config.port, () => {
    console.log('Server listening to port', config.port);
  });
}

main().catch(err => {
  console.log(err);
  console.log(err?.message);
});

// gracefully close server
process.on('unhandledRejection', error => {
  console.log('Unhandled Rejection is detected. we are closing our server!');

  if (server) {
    server.close(() => {
      console.log({ error });
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// signal termination
process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) server.close();
});
