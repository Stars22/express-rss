const morgan = require('./morgan');
const winston = require('./winston');

const logger = morgan('{"url": ":url", "body": ":body", "query": ":query"}', {
  stream: { write: message => winston.log('info', message) }
});

// Uncaught Exceptions are handled by winston without process.on see code in winston js
function logRejection() {
  process.on('unhandledRejection', reason => {
    winston.error(reason.message);
  });
}
function logError(err) {
  winston.error({
    message: `Error message: ${err.message}. Status ${err.status}`
  });
}

module.exports = { logger, logError, logRejection };
