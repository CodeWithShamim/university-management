import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()

// using cors
app.use(cors())

// parsing data
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('Server successfully working...')
})

// routes
// app.use("/api/v1/user", userRoutes)

export default app
