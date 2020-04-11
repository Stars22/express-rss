const winston = require('winston');
const path = require('path');

const options = {
  file: {
    level: 'info',
    filename: path.join(__dirname, '../combined.log'),
    maxsize: 1048576,
    colorize: false
  },
  console: {
    colorize: true
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
    new winston.transports.File({
      level: 'error',
      filename: path.join(__dirname, '../rejections.log')
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({
      ...options.file,
      filename: path.join(__dirname, '../exceptions.log')
    }),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
});

logger.stream = {
  write: message => logger.log('info', message)
};
// Uncaught Exceptions are handled by winston
process.on('unhandledRejection', reason => {
  logger.error(reason.message);
});

module.exports = logger;
