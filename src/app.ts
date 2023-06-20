import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

const app: Application = express();

// using cors
app.use(cors());

// parsing data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// testing server
app.get('/', (req: Request, res: Response) => {
  res.send('Server successfully working...');
});

// routes
app.use('/api/v1', routes);

// global error handler
app.use(globalErrorHandler);

export default app;
