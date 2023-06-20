/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import userRoutes from './app/modules/user/user.route'

const app: Application = express()

class ApiError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string | undefined, stack?: '') {
    super(message)
    this.statusCode = statusCode

    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

// using cors
app.use(cors())

// parsing data
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// testing server
app.get('/', (req: Request, res: Response) => {
  res.send('Server successfully working...')
})

// testing error
app.get('/error', (req: Request, res: Response, next: NextFunction) => {
  // throw new ApiError(500, 'New error reveived.')
  next('New error reveived.')
})

// global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ApiError) {
    res.status(400).json({
      success: false,
      message: error,
    })
  } else {
    res.status(500).json({
      success: false,
      message: 'Something went wrong.',
    })
  }
})

// routes
app.use('/api/v1/user', userRoutes)

export default app
