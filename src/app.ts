import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import userRoutes from './app/modules/user/user.route';

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
app.use('/api/v1/user', userRoutes);

// global error handler
app.use(globalErrorHandler);

export default app;
