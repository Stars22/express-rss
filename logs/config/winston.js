const { createLogger, format, transports } = require('winston');
const path = require('path');

const options = {
  file: {
    level: 'info',
    filename: path.join(__dirname, '../combined.log'),
    maxsize: 1048576,
    format: format.combine(format.uncolorize(), format.json())
  }
};

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.File(options.file),
    new transports.Console(),
    new transports.File({
      ...options.file,
      level: 'error',
      filename: path.join(__dirname, '../rejections.log')
    })
  ],
  exceptionHandlers: [
    new transports.File({
      ...options.file,
      filename: path.join(__dirname, '../exceptions.log')
    }),
    new transports.Console()
  ],
  exitOnError: false
});

// Uncaught Exceptions are handled by winston without process.on ^^^ see code above
process.on('unhandledRejection', reason => {
  logger.error(reason.message);
});

module.exports = logger;
