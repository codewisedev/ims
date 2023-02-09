const { createLogger, transports, format } = require('winston')
require('winston-mongodb')

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'error',
      format: format.combine(format.timestamp(), format.json())
    }),
    new transports.File({
      filename: 'log/info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json())
    }),
    new transports.MongoDB({
      level: 'log',
      db: config.database.url,
      collection: 'log',
      format: format.combine(format.timestamp(), format.json())
    })
  ]
})

module.exports = logger
