const winston = require('winston');
const path = require('path');

const options = {
  file: {
    level: 'silly',
    filename: path.join(__dirname, '../app.log'),
    handleException: true,
    json: true,
    maxsize: 1048576
  },
  console: {
    level: 'info',
    colorize: true
  }
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
});

logger.stream = {
  write: message => logger.info(message)
};

module.exports = logger;
