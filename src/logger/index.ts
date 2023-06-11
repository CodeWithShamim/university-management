import path from 'path'
import { Logger, createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
const { combine, timestamp, label, printf } = format

// create format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return `${date.toDateString()} ${hours}:${minutes}:${seconds} [${label}] ${level}: ${message}`
})

// create console transports
const createConsoleTransports = (logger: Logger) => {
  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new transports.Console({
        format: combine(label({ label: 'UM' }), timestamp(), myFormat),
      })
    )
  }
}

// ---- success logger ----
const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'UM' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'UM--%DATE%-SUCCESS.log'
      ),
      level: 'info',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '1d',
    }),
  ],
})
createConsoleTransports(logger)

// --- error logger ---
const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'UM' }), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'UM--%DATE%-ERROR.log'
      ),
      level: 'error',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '1d',
    }),
  ],
})
createConsoleTransports(errorLogger)

export { errorLogger, logger }
