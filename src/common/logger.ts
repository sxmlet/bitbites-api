import * as winston from 'winston'

/**
 * Create a logger instance to write log messages in JSON format.
 *
 * @param loggerName - a name of a logger that will be added to all messages
 * @param level - the logger level
 */
export function createLogger(loggerName: string, level: string = 'info') {
  return winston.createLogger({
    level: level,
    format: winston.format.json(),
    defaultMeta: { name: loggerName, app: 'bites-api' },
    transports: [
      new winston.transports.Console()
    ]
  })
}
