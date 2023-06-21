import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
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

// testing error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// app.get('/error', async (req: Request, res: Response) => {
//   Promise.reject(new Error('Unhandled Promise Rejection'));
// });

// global error handler
app.use(globalErrorHandler);

// handle not found route
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Route not found!',
      },
    ],
  });
});

export default app;
